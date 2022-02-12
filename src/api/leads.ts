import { request } from '#/utils/request';

import { Order as OrderProps } from '@components/Table';

export const getLeadsEndpoint = () => `leads`;
export const getLeadByIdEndpoint = (id: string) => `leads/${id}`;
export const validateStoreEndpoint = (id: string) => `leads/${id}/database`;
export const validateJudicialRecordEndpoint = (id: string) => `leads/${id}/judicial`;
export const getScoreEndpoint = (id: string) => `leads/${id}/score`;

export type Lead = {
  identityNumber: string;
  birthDate: string;
  name: Name;
  email: string;
  updatedAt: string;
  prospect: boolean;
  score: number;
  id: string;
};

export type Leads = {
  results: Lead[];
  pagination: Pagination;
};

export type Name = {
  first: string;
  last: string;
};

export type Pagination = {
  sort: Sort;
  size: number;
  page: number;
  pages: number;
};

export type Sort = {
  order: OrderProps;
  sort: keyof typeof SORT;
};

export const SORT = {
  updatedAt: 'updatedAt',
};

export const getLeads = async (searchParams?: Partial<Pagination>) => {
  const {
    sort: { sort, order },
    ...rest
  } = { sort: {} as Sort, ...searchParams };

  return request
    .get(getLeadsEndpoint(), {
      searchParams: {
        ...rest,
        sort: `${sort}, ${order}`,
      },
    })
    .json<Leads>();
};

export const getLeadById = async (id: string) => {
  return request.get(getLeadByIdEndpoint(id)).json<Lead>();
};

export const validateStore = async (id: string) => {
  return request.get(validateStoreEndpoint(id)).json<boolean>();
};

export const validateJudicialRecord = async (id: string) => {
  return request.get(validateJudicialRecordEndpoint(id)).json<boolean>();
};

export const getScore = async (id: string) => {
  return request.get(getScoreEndpoint(id)).json<number>();
};

export const validate = async (id: string) => {
  const [store, judicialRecord] = await Promise.all([
    validateStore(id),
    validateJudicialRecord(id),
  ]);

  if (store && judicialRecord) {
    return (await getScore(id)) > 60;
  }

  return false;
};
