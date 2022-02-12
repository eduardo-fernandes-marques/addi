import { Server } from 'miragejs';

import {
  getLeadByIdEndpoint,
  getLeadsEndpoint,
  getScoreEndpoint,
  validateJudicialRecordEndpoint,
  validateStoreEndpoint,
} from '../leads';

import fixtures from './fixtures.json';

export function routes(this: Server) {
  this.get(getLeadByIdEndpoint(':id'), (schema, request) => {
    const { id } = request.params;

    return schema.find('leads', id);
  });

  this.get(getLeadsEndpoint(), (schema, { queryParams }) => {
    const { models: results } = schema.all('leads');
    const { pagination } = fixtures;

    return {
      pagination: {
        ...pagination,
        ...queryParams,
      },
      results,
    };
  });

  this.get(getScoreEndpoint(':id'), (schema, request) => {
    const { id } = request.params;

    const lead = schema.find('leads', id);

    const score = Math.floor(Math.random() * 101);

    lead?.update({ prospect: score > 60, updateAt: Date.now().toLocaleString() });

    return score;
  });

  this.get(validateJudicialRecordEndpoint(':id'), () => Math.random() < 0.5);

  this.get(validateStoreEndpoint(':id'), () => Math.random() < 0.5);

  this.passthrough();
}
