import { getEnv } from '#/utils/getEnv';

export const APPLICATION = {
  get ENV() {
    return getEnv();
  },
  get HOST_URL() {
    return `https://localhost:3002`;
  },
  ID: 'addi',
};

export const PAGE = {
  DETAIL: {
    LEADS: (id: string) => `/leads/${id}`,
    PROSPECTS: (id: string) => `/prospects/${id}`,
  },
  HOME: () => '/',
  LIST: {
    LEADS: () => '/leads',
    PROSPECTS: () => '/prospects',
  },
  LOGIN: () => '/login',
};

export const SCORE = 60;

export const NOMECLATURES = {
  DETAIL: { LEADS: 'LEAD', PROSPECTS: 'PROSPECT' },
  LIST: { LEADS: 'LEADS', PROSPECTS: 'PROSPECTS' },
};

export const LOGIN = {
  EMAIL: 'eduardo.fernandes.marques@gmail.com',
  PASSWORD: '12345',
};

export const AUTHENTICATION = 'isAuthenticated';
