import { useMemo, useReducer, useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { Layout } from '#/components/Layout';
import { withFeedback, Props as WithFeedbackProps } from '#/hocs/withFeedback';
import {
  getLeads,
  getLeadsEndpoint,
  validate,
  Pagination as PaginationProps,
  Sort as SortProps,
  Lead as LeadProps,
} from '@api/leads';

import { Table } from './Table';

type Props = WithFeedbackProps;

type Modal = {
  id?: string;
  show: boolean;
};

export type Params = {
  id: string;
};

export type Search = {
  coop: string;
};

type State = {
  modal: Modal;
  pages?: number;
  filter?: string;
  pagination: PaginationProps;
};

type Action =
  | { type: 'FETCH_FAILED' }
  | { type: 'PAGE_CHANGE'; payload: number }
  | { type: 'SORT_CHANGE'; payload: SortProps }
  | { type: 'FILTER_CHANGED'; payload: string };

const INITIAL_STATE: State = {
  modal: { show: false },
  pages: 0,
  pagination: {
    page: 0,
    size: 5,
    sort: {
      order: 'ascending',
      sort: 'updatedAt',
    },
  },
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'PAGE_CHANGE':
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };

    case 'SORT_CHANGE':
      return {
        ...state,
        pagination: { ...state.pagination, sort: action.payload },
      };

    case 'FETCH_FAILED':
      return { ...state, loading: false };

    /* istanbul ignore next */
    default:
      return state;
  }
};

export const Home: React.FC<Props> = ({ setException, setSucceeded, setError }) => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(getLeadsEndpoint(), getLeads);

  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });

  console.log(state, dispatch);

  const loading = useMemo(() => !data && !error, [data, error]);

  const handleClick = useCallback(
    async (lead: LeadProps) => {
      const { id, updatedAt } = lead;
      const success = await validate(id);

      if (success)
        setSucceeded({
          children: 'It has already been moved to prospects list.',
          title: `Lead ${id} was processed to a prospect`,
        });
      else
        setError({
          children: `Lead will be blocker until ${updatedAt}`,
          title: `Lead ${id} was not processed to a prospect`,
        });

      mutate(getLeadsEndpoint());
    },
    [mutate, setError, setSucceeded]
  );

  if (loading) return <div>Carregando...</div>;
  if (error) setException('Error to get leads');

  return (
    <Layout>
      <Layout.Container>
        <Layout.Content>
          <Table
            pages={state.pages}
            size={state.pagination.size}
            rows={data?.leads ?? []}
            page={state.pagination.page + 1}
            onProccess={handleClick}
            onSort={(sort: SortProps) => dispatch({ payload: sort, type: 'SORT_CHANGE' })}
            onChangePage={(page: number) => dispatch({ payload: page - 1, type: 'PAGE_CHANGE' })}
          />
        </Layout.Content>
      </Layout.Container>
    </Layout>
  );
};

export default withFeedback(Home);
