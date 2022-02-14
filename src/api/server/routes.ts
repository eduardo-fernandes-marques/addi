import { Server } from 'miragejs';

import {
  getLeadByIdEndpoint,
  getLeadsEndpoint,
  getScoreEndpoint,
  Lead as LeadProps,
  validateEndpoint,
  validateJudicialRecord,
  validateJudicialRecordEndpoint,
  validateStore,
  validateStoreEndpoint,
} from '../leads';
import { isProspect } from '../rules';

import { postLoginEndpoint, Login as LoginProps } from '@api/login';

import { AUTHENTICATION, LOGIN, NOMECLATURES } from '#/constants';
import { sortBy } from '#/utils/sort';

import fixtures from './fixtures.json';

export function routes(this: Server) {
  this.get(getLeadByIdEndpoint(':id'), (schema, request) => {
    const { id } = request.params;

    const lead = schema.find('leads', id);

    return lead?.attrs || {};
  });

  this.get(getLeadsEndpoint(), (schema, { queryParams }) => {
    const { pagination } = fixtures;
    const { size, page, sort, order, type, filter } = queryParams;

    const { models: results } = schema.where('leads', (lead) => {
      let result =
        type === NOMECLATURES.LIST.LEADS
          ? !(lead as unknown as LeadProps)?.prospect
          : (lead as unknown as LeadProps)?.prospect;

      if (filter !== 'undefined' && filter) {
        result = (lead as unknown as LeadProps)?.name
          .toLowerCase()
          .includes(filter.toLocaleLowerCase());
      }

      return result;
    });

    const start = Number(page) * Number(size);
    const end = start + Number(size);
    const pages = Math.round(results.length / Number(size));

    return {
      pagination: {
        ...pagination,
        ...queryParams,
        pages,
      },
      results: results.slice(start, end).sort(sortBy(sort, order)),
    };
  });

  this.get(getScoreEndpoint(':id'), (schema, request) => {
    const { id } = request.params;
    const lead = schema.find('leads', id);
    const score = Math.floor(Math.random() * 101);

    lead?.update({
      prospect: isProspect(score),
      updateAt: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    });

    return schema.find('leads', id)?.attrs || {};
  });

  this.get(validateEndpoint(':id'), async (schema, request) => {
    let score = 0;
    const { id } = request.params;

    const [store, judicialRecord] = await Promise.all([
      validateStore(id),
      validateJudicialRecord(id),
    ]);

    if (store && judicialRecord) {
      score = Math.floor(Math.random() * 101);
    }

    const lead = schema.find('leads', id);

    lead?.update({
      prospect: isProspect(score),
      updatedAt: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    });

    return lead?.attrs || {};
  });

  this.get(validateJudicialRecordEndpoint(':id'), () => Math.random() < 0.9);

  this.get(validateStoreEndpoint(':id'), () => Math.random() < 0.9);

  this.post(postLoginEndpoint(), (_, request) => {
    const { email, password } = JSON.parse(request.requestBody) as unknown as LoginProps;

    if (email === LOGIN.EMAIL && password === LOGIN.PASSWORD) {
      localStorage.setItem(AUTHENTICATION, 'true');

      return true;
    }

    return false;
  });

  this.passthrough();
}
