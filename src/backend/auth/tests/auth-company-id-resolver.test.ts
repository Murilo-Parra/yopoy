import { describe, it, expect } from 'vitest';
import { Request } from 'express';
import { resolveAuthCompanyId } from '../AuthCompanyIdResolver';

describe('AuthCompanyIdResolver', () => {
  it('deve retornar undefined se nenhum companyId for fornecido', () => {
    const req = { body: {}, headers: {} } as unknown as Request;
    expect(resolveAuthCompanyId(req)).toBeUndefined();
  });

  it('deve priorizar companyId do body', () => {
    const req = {
      body: { companyId: 'body-id' },
      headers: {
        'x-yopoy-company-id': 'header-yopoy-id',
        'x-company-id': 'header-legacy-id'
      }
    } as unknown as Request;
    expect(resolveAuthCompanyId(req)).toBe('body-id');
  });

  it('deve usar x-yopoy-company-id se body estiver vazio', () => {
    const req = {
      body: {},
      headers: {
        'x-yopoy-company-id': 'header-yopoy-id',
        'x-company-id': 'header-legacy-id'
      }
    } as unknown as Request;
    expect(resolveAuthCompanyId(req)).toBe('header-yopoy-id');
  });

  it('deve usar x-company-id se body e x-yopoy-company-id estiverem vazios', () => {
    const req = {
      body: {},
      headers: {
        'x-company-id': 'header-legacy-id'
      }
    } as unknown as Request;
    expect(resolveAuthCompanyId(req)).toBe('header-legacy-id');
  });

  it('deve ignorar espacos em branco', () => {
    const req = {
      body: { companyId: '   ' },
      headers: {
        'x-yopoy-company-id': '  ',
        'x-company-id': 'header-legacy-id'
      }
    } as unknown as Request;
    expect(resolveAuthCompanyId(req)).toBe('header-legacy-id');
  });
});
