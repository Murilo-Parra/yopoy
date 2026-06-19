import { describe, it, expect } from 'vitest';
import { resolveAuthCompanyId, type AuthCompanyIdRequest } from '../AuthCompanyIdResolver';

describe('AuthCompanyIdResolver', () => {
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
