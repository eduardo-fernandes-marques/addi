import { Server as MirageServer, Model } from 'miragejs';

import { APPLICATION } from '#/constants';

import { Lead } from '../leads';
import fixtures from './fixtures.json';
import { routes } from './routes';

export { Response } from 'miragejs';

export type { Request } from 'miragejs';

export type Server = MirageServer;

export function Server() {
  const server = new MirageServer({
    environment: process.env.NODE_ENV,
    fixtures: {
      leads: fixtures.leads,
    },
    models: {
      leads: Model.extend<Lead[]>([]),
    },
    routes,
    seeds: (context) => {
      context.loadFixtures('leads');
    },
    trackRequests: true,
    urlPrefix: APPLICATION.HOST_URL,
  });

  return server;
}
