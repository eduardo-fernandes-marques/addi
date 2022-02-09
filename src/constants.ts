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
  ROOT: () => '/',
};
