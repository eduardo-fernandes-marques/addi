import { Server as MirageServer, Model } from 'miragejs';

import { APPLICATION } from '#/constants';

import { Lead } from '../leads';

import fixtures from './fixtures.json';
import { routes } from './routes';

export { Response } from 'miragejs';

export type { Request } from 'miragejs';

export type Server = MirageServer;

export const Server = () => {
  const server = new MirageServer({
    environment: process.env.NODE_ENV,
    fixtures: {
      leads: Array(6)
        .fill(fixtures.leads)
        .reduce((acc, items) => [...acc, ...items], [] as Lead[]),
    },
    models: {
      leads: Model.extend<Lead[]>([]),
    },
    routes,

    trackRequests: true,
    urlPrefix: APPLICATION.HOST_URL,
  });

  return server;
};
