import { useMemo, useReducer, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

import {
  getLeads,
  validate,
  Pagination as PaginationProps,
  Sort as SortProps,
  Lead as LeadProps,
  Leads as LeadsProps,
} from '@api/leads';

import { Layout } from '@components/_Layout';
import { Button } from '@components/Button';
import { Loader } from '@components/Loader';
import { Spacing } from '@components/Spacing';
import { Row as RowProps } from '@components/Table';
import { Title } from '@components/Title';

import { PAGE } from '#/constants';
import { withFeedback, Props as WithFeedbackProps } from '#/hocs/withFeedback';
import { withTemplate } from '#/hocs/withTemplate';

import { Table } from './Table';

export type Pagination = Omit<PaginationProps, 'pages'> & { type?: string };
type Props = WithFeedbackProps;

type State = {
  filter?: string;
  loading: boolean;
  results: LeadProps[];
  pages?: number;
  pagination: Pagination;
};

type Action =
  | { type: 'FETCH_FAILED' }
  | { type: 'FETCH_PENDING' }
  | { type: 'FETCH_SUCCEEDED'; payload: { data: LeadsProps } }
  | { type: 'PAGE_CHANGE'; payload: number }
  | { type: 'SORT_CHANGE'; payload: SortProps }
  | { type: 'FILTER_CHANGED'; payload: string };

const INITIAL_STATE: State = {
  loading: false,
  pagination: {
    page: 0,
    size: 5,
    sort: {
      order: 'ascending',
      sort: 'updatedAt',
    },
  },
  results: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        loading: false,
        pages: action.payload.data.pagination.pages,
        results: action.payload.data.results,
      };
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

    case 'FETCH_PENDING':
      return { ...state, loading: true };

    case 'FETCH_FAILED':
      return { ...state, loading: false };

    /* istanbul ignore next */
    default:
      return state;
  }
};

export const List: React.FC<Props> = ({ setSucceeded, setError }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const type = useMemo(() => pathname.replace('/', '').toUpperCase(), [pathname]);

  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });

  const fetch = useCallback(async () => {
    try {
      dispatch({ type: 'FETCH_PENDING' });

      const data = await getLeads({ ...state.pagination, type });

      dispatch({ payload: { data }, type: 'FETCH_SUCCEEDED' });
    } catch (_) {
      dispatch({ type: 'FETCH_FAILED' });

      setError({
        children: 'It was not able to fetch data. Try later.',
        title: 'Error to fetch leads',
      });
    }
  }, [setError, state.pagination, type]);

  const handleSort = useCallback((sort: SortProps) => {
    dispatch({ payload: sort, type: 'SORT_CHANGE' });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ payload: page - 1, type: 'PAGE_CHANGE' });
  }, []);

  const handleClick = useCallback(
    async (id: string) => {
      try {
        dispatch({ type: 'FETCH_PENDING' });

        const { prospect } = await validate(id);

        const data = await getLeads({ ...state.pagination });

        dispatch({ payload: { data }, type: 'FETCH_SUCCEEDED' });

        if (prospect)
          setSucceeded({
            children: 'It has already been moved to prospects list.',
            title: `Lead ${id} was processed to a prospect`,
          });
        else
          setError({
            children: 'Lead was not converted to a prospect but had been updated.',
            title: `Lead ${id} is not ready`,
          });
      } catch (_) {
        dispatch({ type: 'FETCH_FAILED' });

        setError({
          children: 'It was not able to fetch data. Try later.',
          title: 'Error to fetch leads',
        });
      }
    },
    [setError, setSucceeded, state.pagination]
  );
  Button;

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <>
      <Loader data-testid="loader" show={state.loading} fullScreen />

      <Title as="h1" size="large">
        {type}
      </Title>
      <Spacing appearance="medium" />

      <Table
        pagination={{
          onChangePage: (page: number) => handlePageChange(page),
          onSort: (sort: SortProps) => handleSort(sort),
          page: (state?.pagination?.page ?? 0) + 1,
          pages: state.pages ?? 0,
        }}
        rows={(state?.results ?? []) as RowProps[]}
        onProccess={handleClick}
        type={type}
      />
      <Spacing appearance="medium" />

      <Layout.Wrapper>
        <Button block appearance="primary" onClick={() => navigate(PAGE.ROOT())}>
          Back
        </Button>
      </Layout.Wrapper>
    </>
  );
};

export default withTemplate(withFeedback(List));
