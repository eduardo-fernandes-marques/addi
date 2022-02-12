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

export type Params = {
  id: string;
};

export type Search = {
  coop: string;
};

type State = {
  filter?: string;
  pagination: Partial<PaginationProps>;
};

type Action =
  | { type: 'FETCH_FAILED' }
  | { type: 'PAGE_CHANGE'; payload: number }
  | { type: 'SORT_CHANGE'; payload: SortProps }
  | { type: 'FILTER_CHANGED'; payload: string };

const INITIAL_STATE: State = {
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
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });

  const { data, error } = useSWR(getLeadsEndpoint(), getLeads);

  const loading = useMemo(() => !data && !error, [data, error]);

  const handleSort = useCallback(
    (sort: SortProps) => {
      dispatch({ payload: sort, type: 'SORT_CHANGE' });

      mutate(
        [getLeadsEndpoint(), { ...state.pagination, sort }],
        getLeads({ ...state.pagination, sort })
      );
    },
    [mutate, state.pagination]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch({ payload: page - 1, type: 'PAGE_CHANGE' });

      mutate(getLeadsEndpoint(), getLeads({ ...state.pagination, page }));
    },
    [mutate, state.pagination]
  );

  console.log('test: ', data?.pagination?.page);
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

      mutate([getLeadsEndpoint(), { ...state.pagination }], getLeads({ ...state.pagination }));
    },
    [mutate, setError, setSucceeded, state.pagination]
  );

  if (loading) return <div>Carregando...</div>;
  if (error) setException('Error to get leads');

  return (
    <Layout>
      <Layout.Container>
        <Layout.Content>
          <Table
            pagination={{
              ...(data?.pagination as PaginationProps),
              onChangePage: (page: number) => handlePageChange(page),
              onSort: (sort: SortProps) => handleSort(sort),
              page: data?.pagination?.page ?? 0,
            }}
            rows={data?.results ?? []}
            onProccess={handleClick}
          />
        </Layout.Content>
      </Layout.Container>
    </Layout>
  );
};

export default withFeedback(Home);
