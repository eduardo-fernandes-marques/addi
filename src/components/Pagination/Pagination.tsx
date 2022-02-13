import cn from 'clsx';
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';

import styles from './styles.module.scss';

export type Props = {
  numberOfPages: number;
  currentPage?: number;
  onChange?: (page: number) => void;
} & Pick<
  React.HTMLAttributes<HTMLUListElement>,
  Exclude<keyof React.HTMLAttributes<HTMLUListElement>, 'onChange'>
>;

export type Page = {
  page: number | '...';
  selected: boolean;
  key: number;
};

export type SetupPagesConfig = {
  currentPage: number;
  numberOfPages: number;
};

const PAGINATION_SIZE = 7;
const FIRST_PAGE = 1;
const MINIMUM_INITIAL_ELLIPSE = 4;
const MINIMUM_PAGE_BUTTONS = 3;
const ELLIPSE_PLUS_FIRST_OR_LAST = 2;
const MAXIMUM_NUMBER_OF_PAGES_WITHOUT_ELLIPSIS = 5;

const createPages = ({ numberOfPages, currentPage }: SetupPagesConfig): Page[] => {
  if (numberOfPages === 0) return [];
  const shouldHaveInitialEllipsis =
    currentPage - FIRST_PAGE >= MINIMUM_INITIAL_ELLIPSE &&
    numberOfPages > MAXIMUM_NUMBER_OF_PAGES_WITHOUT_ELLIPSIS;
  const shouldHaveFinalEllipsis =
    currentPage + MINIMUM_PAGE_BUTTONS < numberOfPages &&
    numberOfPages > PAGINATION_SIZE &&
    numberOfPages > MAXIMUM_NUMBER_OF_PAGES_WITHOUT_ELLIPSIS;
  const pagesLength =
    MINIMUM_PAGE_BUTTONS +
    (shouldHaveInitialEllipsis ? 0 : ELLIPSE_PLUS_FIRST_OR_LAST) +
    (shouldHaveFinalEllipsis ? 0 : ELLIPSE_PLUS_FIRST_OR_LAST);
  const pages: Page[] = [];
  // eslint-disable-next-line no-nested-ternary
  let startUpPage = shouldHaveInitialEllipsis
    ? shouldHaveFinalEllipsis
      ? currentPage - FIRST_PAGE
      : numberOfPages - MINIMUM_INITIAL_ELLIPSE
    : FIRST_PAGE;

  if (shouldHaveInitialEllipsis) {
    pages.push(
      { key: FIRST_PAGE, page: FIRST_PAGE, selected: false },
      { key: 0, page: '...', selected: false }
    );
  }

  for (let index = 0; index < pagesLength && startUpPage <= numberOfPages; index += 1) {
    pages.push({
      key: startUpPage,
      page: startUpPage,
      selected: startUpPage === currentPage,
    });
    startUpPage += 1;
  }

  if (shouldHaveFinalEllipsis) {
    pages.push(
      { key: numberOfPages + 1, page: '...', selected: false },
      { key: numberOfPages, page: numberOfPages, selected: false }
    );
  }

  return pages;
};

const Pagination: React.FC<Props> = ({
  className,
  numberOfPages,
  currentPage,
  onChange,
  ...props
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  const correctCurrentPage = currentPage !== undefined ? currentPage : internalCurrentPage;

  const handleChangePage = (page: 'previous' | 'next' | '...' | number) => {
    return () => {
      const newPage =
        // eslint-disable-next-line no-nested-ternary
        typeof page === 'number'
          ? page
          : page === 'previous'
          ? correctCurrentPage - 1
          : correctCurrentPage + 1;
      setInternalCurrentPage(newPage);
      onChange && onChange(newPage);
    };
  };

  const pages = createPages({
    currentPage: correctCurrentPage,
    numberOfPages,
  });

  return (
    <nav
      role="navigation"
      className={cn(styles.pagination, className)}
      aria-label="Paginação"
      {...props}
    >
      <ol>
        <li>
          <button
            type="button"
            className={cn(styles.item)}
            disabled={correctCurrentPage === 1}
            onClick={handleChangePage('previous')}
            aria-label={`Voltar ${
              correctCurrentPage === 1 ? 'página' : `para página ${correctCurrentPage - 1}`
            }`}
          >
            <ChevronLeftIcon title="chevron-left" />
          </button>
        </li>
        {pages.map(({ page, selected, key }) => (
          <li key={`${key}`}>
            <button
              type="button"
              className={cn(styles.item, {
                [styles['-selected']]: selected,
              })}
              onClick={handleChangePage(page)}
              aria-hidden={typeof page !== 'number' ? 'true' : 'false'}
              aria-label={`${typeof page !== 'number' ? '' : `Ir para a página ${page}`}`}
              aria-current={page === correctCurrentPage}
              disabled={typeof page !== 'number' || selected}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={cn(styles.item)}
            disabled={correctCurrentPage === numberOfPages}
            onClick={handleChangePage('next')}
            aria-label={`Avançar ${
              correctCurrentPage === numberOfPages
                ? 'página'
                : `para página ${correctCurrentPage + 1}`
            }`}
          >
            <ChevronRightIcon title="chevron-right" />
          </button>
        </li>
      </ol>
    </nav>
  );
};

export default Pagination;
