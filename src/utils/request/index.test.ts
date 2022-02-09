import { Server } from '#/api/server';

describe('utils > request', () => {
  let server: Server;

  beforeEach(() => {
    jest.resetModules();

    server = Server();
    server.get('', () => ({ ok: 'ok' }));
  });

  afterEach(() => {
    server.shutdown();
  });
});
