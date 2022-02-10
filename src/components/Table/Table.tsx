import cn from 'clsx';
import dlv from 'dlv';
import * as uuid from 'uuid';

import { Button, Props as ButtonProps } from '@components/Button';

import useSortBy, { Order, SortBy } from './hooks/useSortBy';
import styles from './styles.module.scss';

export type Accessor<T = any> = (data: { [key: string]: T }, index?: number) => React.ReactNode;

export type SortableColumn = {
  sortable?: boolean;
  onSort?: (order: Order) => void;
  disableSorting?: boolean;
  sortAriaLabel?: string;
  initiallySorted?: 'ascending' | 'descending';
};

export type Column = {
  label: React.ReactNode;
  width?: string;
  fixedLeft?: boolean;
  fixedRight?: boolean;
  align?: 'left' | 'center' | 'right';
  accessor: string | Accessor;
} & SortableColumn;

export type Row = {
  [key: string]: any;
};

export type Props = {
  rows: Row[];
  columns: Column[];
  anchor?: (row: Row) => ButtonProps;
  noRowsMessage?: React.ReactNode | string;
  height?: number | string;
} & React.HTMLAttributes<HTMLTableElement>;

const getInitialSorting = (columns: SortableColumn[]): SortBy => {
  const column = columns.findIndex((c) => c.initiallySorted);
  const order = dlv(columns[column], 'initiallySorted', 'descending');
  return { column, order };
};

const Table: React.FC<Props> = ({
  rows,
  columns,
  className,
  noRowsMessage = 'There is no data',
  anchor,
  height,
  ...props
}) => {
  const [sortBy, setSortBy] = useSortBy(getInitialSorting(columns));
  const isSorted = (columnIndex: number) => sortBy.column === columnIndex;

  return (
    <div style={{ maxHeight: height }}>
      <table className={cn(styles.table, className)} {...props}>
        <thead data-head="">
          <tr data-row="">
            {columns.map((column, i) => (
              <th
                key={uuid.v4()}
                style={{ width: column.width }}
                className={cn({
                  [styles['-fixed-left']]: column.fixedLeft,
                  [styles['-fixed-right']]: column.fixedRight,
                  [styles['-left']]: column.align === 'left',
                  [styles['-center']]: column.align === 'center',
                  [styles['-right']]: column.align === 'right',
                })}
                data-column=""
                aria-sort={isSorted(i) ? sortBy.order : undefined}
              >
                {!column.sortable ? (
                  column.label
                ) : (
                  <button
                    type="button"
                    disabled={column.disableSorting}
                    onClick={() => {
                      if (!column.onSort) return;

                      const order = setSortBy(i);
                      column.onSort(order);
                    }}
                    aria-label={column.sortAriaLabel}
                  >
                    {column.label}
                  </button>
                )}
              </th>
            ))}

            {anchor ? (
              <th
                aria-label="th-anchor"
                className={cn({
                  [styles['-fixed-right']]: true,
                  [styles['-anchor']]: anchor,
                })}
              />
            ) : null}
          </tr>
        </thead>
        <tbody data-body="">
          {rows.length ? (
            rows.map((row, i) => {
              return (
                <tr
                  key={uuid.v4()}
                  data-row=""
                  className={cn({ [styles['-odd']]: (i + 1) % 2 !== 0 })}
                >
                  {columns.map((column) => (
                    <td
                      key={uuid.v4()}
                      data-column=""
                      className={cn({
                        [styles['-fixed-left']]: column.fixedLeft,
                        [styles['-fixed-right']]: column.fixedRight,
                        [styles['-left']]: column.align === 'left',
                        [styles['-center']]: column.align === 'center',
                        [styles['-right']]: column.align === 'right',
                      })}
                    >
                      {typeof column.accessor === 'function'
                        ? column.accessor(row, i)
                        : dlv(row, column.accessor)}
                    </td>
                  ))}

                  {anchor ? (
                    <td
                      className={cn(styles['-right'], styles['-fixed-right'], styles['-actions'])}
                    >
                      {anchor && <Button {...anchor(row)}>Anchor</Button>}
                    </td>
                  ) : null}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                className={styles['-empty']}
                colSpan={anchor ? columns.length + 1 : columns.length}
              >
                {noRowsMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
