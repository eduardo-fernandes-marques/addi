import ky from 'ky-universal';

import { APPLICATION } from '#/constants';

export const request = ky.extend({
  hooks: {
    afterResponse: [
      (_, __, response) => {
        return response;
      },
    ],
    beforeRequest: [
      (callback) => {
        const token = 'token';

        token && callback.headers.set('Authorization', `Bearer ${token}`);

        return callback;
      },
    ],
  },
  prefixUrl: APPLICATION.HOST_URL,
  retry: 0,
  timeout: 30000,
});
