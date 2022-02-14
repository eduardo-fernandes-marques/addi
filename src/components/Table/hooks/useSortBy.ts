import { useState } from 'react';

export type Order = 'ascending' | 'descending' | 'none';
export type SortBy = {
  column?: number;
  order: Order;
};

type useSortHook = [SortBy, (column: number) => Order];

const nextOrderDirection: { [key: string]: Order } = {
  ascending: 'descending',
  descending: 'ascending',
  none: 'descending',
};

const useSort = (initialSort: SortBy): useSortHook => {
  const [sortBy, setSortBy] = useState<SortBy>(initialSort);

  const setSort = (column: number) => {
    const newOrder = sortBy.column === column ? nextOrderDirection[sortBy.order] : 'descending';
    setSortBy({
      column,
      order: newOrder,
    });
    return newOrder;
  };

  return [sortBy, setSort];
};

export default useSort;
