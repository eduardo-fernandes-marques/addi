import { useMemo, useCallback } from 'react';

import { Sort as SortProps, Pagination as PaginationProps } from '@api/leads';

import { Button } from '@components/Button';
import { Link as LinkComponent } from '@components/Link';
import { Props as InternalPaginationProps, Pagination } from '@components/Pagination';
import { Spacing } from '@components/Spacing';
import {
  Props as TableProps,
  Column as ColumnProps,
  Row as RowProps,
  Order as OrderProps,
  Table as InternalTable,
} from '@components/Table';

import { PAGE } from '#/constants';

import styles from './styles.module.scss';

export type Props = Omit<TableProps, 'columns'> & {
  rows: RowProps[];
  type: string;
  onProccess: (id: string) => void;
  pagination: Omit<PaginationProps, 'sort' | 'size'> & {
    onChangePage: InternalPaginationProps['onChange'];
    onSort: (sort: SortProps) => void;
  };
};

export const Table: React.FC<Props> = ({
  rows = [],
  onProccess,
  type,
  pagination: { onSort, onChangePage, pages, page },
  ...props
}) => {
  const handleSort = useMemo(
    () => (sort: SortProps['sort']) => (order: OrderProps) => onSort({ order, sort }),
    [onSort]
  );

  const ButtonAction = useCallback(
    (id) => {
      return (
        <Button block appearance="primary" onClick={() => onProccess(id)}>
          Process
        </Button>
      );
    },
    [onProccess]
  );

  const Link = useCallback(
    (id: string, name: string) => {
      return (
        <Button as={LinkComponent} to={PAGE.DETAIL[type](id)}>
          {name}
        </Button>
      );
    },
    [type]
  );

  const columns: ColumnProps[] = [
    {
      accessor: ({ id, name }) => Link(id as string, name as string),
      initiallySorted: 'ascending',
      label: 'Name',
      onSort: handleSort('name'),
      sortable: true,
    },
    {
      accessor: ({ updatedAt }) => updatedAt,
      label: 'Update date',
      onSort: handleSort('updatedAt'),
      sortable: true,
    },
    {
      accessor: ({ id }) => ButtonAction(id),
      align: 'center',
      label: 'Action',
    },
  ];

  return (
    <>
      <InternalTable rows={rows} columns={columns as ColumnProps[]} {...props} />
      <Spacing appearance="small" />

      <div className={styles.nav}>
        <div className={styles.counter}>
          <p>
            Showing {page} of {pages}
          </p>
        </div>
        {!!pages && <Pagination currentPage={page} numberOfPages={pages} onChange={onChangePage} />}
      </div>
    </>
  );
};
