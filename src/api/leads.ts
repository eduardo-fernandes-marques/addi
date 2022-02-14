import { Order as OrderProps } from '@components/Table';
import { Pagination as PaginationProps } from '@containers/Protected/List';

import { request } from '#/utils/request';

export const getLeadsEndpoint = () => 'leads';
export const getLeadByIdEndpoint = (id: string) => `leads/${id}`;
export const validateStoreEndpoint = (id: string) => `leads/${id}/database`;
export const validateJudicialRecordEndpoint = (id: string) => `leads/${id}/judicial`;
export const getScoreEndpoint = (id: string) => `leads/${id}/score`;
export const validateEndpoint = (id: string) => `leads/${id}/validate`;

export type Lead = {
  identityNumber: string;
  birthDate: string;
  name: string;
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
  name: 'name',
  updatedAt: 'updatedAt',
};

export const getLeads = async (searchParams?: PaginationProps) => {
  const {
    sort: { sort, order },
    ...rest
  } = { sort: {} as Sort, ...searchParams };

  return request
    .get(getLeadsEndpoint(), {
      searchParams: {
        ...rest,
        order,
        sort,
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
  return request.get(getScoreEndpoint(id)).json<Lead>();
};

export const validate = async (id: string) => {
  return request.get(validateEndpoint(id)).json<Lead>();
};
