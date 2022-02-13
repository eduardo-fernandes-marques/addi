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
  HOME: () => '/home',
  LIST: {
    LEADS: () => '/leads',
    PROSPECTS: () => '/prospects',
  },
  ROOT: () => '/',
};

export const SCORE = 60;

export const NOMECLATURES = {
  DETAIL: { LEADS: 'LEAD', PROSPECTS: 'PROSPECT' },
  LIST: { LEADS: 'LEADS', PROSPECTS: 'PROSPECTS' },
};
