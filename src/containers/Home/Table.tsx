import React, { useMemo, useCallback } from 'react';

import { Sort as SortProps, Lead as LeadProps } from '@api/leads';

import { Button } from '@components/Button';
import { Props as PaginationProps, Pagination } from '@components/Pagination';
import {
  Props as TableProps,
  Column as ColumnProps,
  Row as RowProps,
  Order as OrderProps,
  Table as InternalTable,
} from '@components/Table';

export type Props = Omit<TableProps, 'columns'> & {
  rows: RowProps[];
  size?: number;
  page?: PaginationProps['currentPage'];
  pages?: PaginationProps['numberOfPages'];
  onChangePage?: PaginationProps['onChange'];
  onProccess: (lead: LeadProps) => void;
  onSort: (sort: SortProps) => void;
};

export const Table: React.FC<Props> = ({
  rows = [],
  onSort,
  pages,
  page,
  onChangePage,
  onProccess,
  ...props
}) => {
  const handleSort = useMemo(
    () => (sort: SortProps['sort']) => (order: OrderProps) => onSort({ order, sort }),
    [onSort]
  );

  const buttonAction = useCallback(
    (lead: LeadProps) => {
      return <Button onClick={() => onProccess(lead)} />;
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
      label: 'Proccess',
      width: '154px',
    },
  ];

  return (
    <>
      <InternalTable rows={rows} columns={columns as ColumnProps[]} {...props} />
      {!!pages && <Pagination currentPage={page} numberOfPages={pages} onChange={onChangePage} />}
    </>
  );
};
