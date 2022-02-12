import React, { useMemo, useCallback } from 'react';

import { Sort as SortProps, Lead as LeadProps, Pagination as PaginationProps } from '@api/leads';

import { Button } from '@components/Button';
import { Props as InternalPaginationProps, Pagination } from '@components/Pagination';
import {
  Props as TableProps,
  Column as ColumnProps,
  Row as RowProps,
  Order as OrderProps,
  Table as InternalTable,
} from '@components/Table';

export type Props = Omit<TableProps, 'columns'> & {
  rows: RowProps[];

  onProccess: (lead: LeadProps) => void;
  pagination: PaginationProps & {
    onChangePage: InternalPaginationProps['onChange'];
    onSort: (sort: SortProps) => void;
  };
};

export const Table: React.FC<Props> = ({
  rows = [],
  onProccess,
  pagination: { onSort, onChangePage, pages, page, size },
  ...props
}) => {
  const handleSort = useMemo(
    () => (sort: SortProps['sort']) => (order: OrderProps) => onSort({ order, sort }),
    [onSort]
  );

  const buttonAction = useCallback(
    (lead: LeadProps) => {
      return <Button onClick={() => onProccess(lead)}>Process</Button>;
    },
    [onProccess]
  );

  const columns: ColumnProps[] = [
    {
      accessor: ({ name }) => `${name.first} ${name.last}`,
      label: 'Name',
      width: '78px',
    },
    {
      accessor: ({ updatedAt }) => updatedAt,
      label: 'Update date',
      onSort: handleSort('updatedAt'),
      sortable: true,
      width: '196px',
    },
    {
      accessor: (lead) => buttonAction(lead as LeadProps),
      label: 'Action',
      width: '154px',
    },
  ];

  return (
    <>
      <InternalTable rows={rows} columns={columns as ColumnProps[]} {...props} />

      <div>
        <div>
          <span>
            Showing {size} de {pages}
          </span>
        </div>
        {!!pages && <Pagination currentPage={page} numberOfPages={pages} onChange={onChangePage} />}
      </div>
    </>
  );
};
