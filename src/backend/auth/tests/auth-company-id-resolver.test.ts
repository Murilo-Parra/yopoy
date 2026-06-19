import { describe, expect, it } from 'vitest';
import {
  resolveAuthCompanyId,
  resolveAuthHeaderString,
  type AuthCompanyIdRequest,
} from '../AuthCompanyIdResolver';

describe('AuthCompanyIdResolver.resolveAuthCompanyId', () => {
  it('deve retornar undefined se nenhum companyId for fornecido', () => {
    const req: AuthCompanyIdRequest = { body: {}, headers: {} };

    expect(resolveAuthCompanyId(req)).toBeUndefined();
  });

  it('deve priorizar companyId do body', () => {
    const req: AuthCompanyIdRequest = {
      body: { companyId: ' body-id ' },
      headers: {
        'x-yopoy-company-id': 'header-yopoy-id',
        'x-company-id': 'header-legacy-id',
      },
    };

    expect(resolveAuthCompanyId(req)).toBe('body-id');
  });

  it('deve usar x-yopoy-company-id se body estiver vazio', () => {
    const req: AuthCompanyIdRequest = {
      body: {},
      headers: {
        'x-yopoy-company-id': ' header-yopoy-id ',
        'x-company-id': 'header-legacy-id',
      },
    };

    expect(resolveAuthCompanyId(req)).toBe('header-yopoy-id');
  });

  it('deve usar x-company-id se body e x-yopoy-company-id estiverem vazios', () => {
    const req: AuthCompanyIdRequest = {
      body: {},
      headers: {
        'x-company-id': ' header-legacy-id ',
      },
    };

    expect(resolveAuthCompanyId(req)).toBe('header-legacy-id');
  });

  it('deve ignorar espacos em branco', () => {
    const req: AuthCompanyIdRequest = {
      body: { companyId: '   ' },
      headers: {
        'x-yopoy-company-id': '  ',
        'x-company-id': ' header-legacy-id ',
      },
    };

    expect(resolveAuthCompanyId(req)).toBe('header-legacy-id');
  });

  it('deve ignorar headers não-string com segurança', () => {
    const req: AuthCompanyIdRequest = {
      body: {},
      headers: {
        'x-yopoy-company-id': ['header-yopoy-id'],
        'x-company-id': undefined,
      },
    };

    expect(resolveAuthCompanyId(req)).toBeUndefined();
  });
});

describe('AuthCompanyIdResolver.resolveAuthHeaderString', () => {
  it('header ausente retorna undefined', () => {
    expect(resolveAuthHeaderString({}, 'x-yopoy-company-id')).toBeUndefined();
  });

  it('header array retorna undefined', () => {
    expect(resolveAuthHeaderString({ 'x-yopoy-company-id': ['a', 'b'] }, 'x-yopoy-company-id')).toBeUndefined();
  });

  it('header em branco retorna undefined', () => {
    expect(resolveAuthHeaderString({ 'x-yopoy-company-id': '   ' }, 'x-yopoy-company-id')).toBeUndefined();
  });

  it('header string valida retorna valor com trim()', () => {
    expect(resolveAuthHeaderString({ 'x-yopoy-company-id': '  valid-id  ' }, 'x-yopoy-company-id')).toBe('valid-id');
  });
});
