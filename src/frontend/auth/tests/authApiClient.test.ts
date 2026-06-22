// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthApiClient } from '../authApiClient';

describe('AuthApiClient Unit Tests', () => {
  const mockFetch = vi.fn();
  vi.stubGlobal('fetch', mockFetch);

  beforeEach(() => {
    mockFetch.mockReset();
    window.localStorage.clear();
  });

  it('deve realizar cadastro de empresa com credentials include', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        company: { id: 'c-1', razaoSocial: 'Yopoy SA', cnpj: '111' },
        user: { id: 'u-1', email: 'adm@yopoy.com', role: 'admin' },
        session: { id: 'sess-1' }
      })
    });

    const res = await AuthApiClient.registerCompany({
      companyName: 'Yopoy SA',
      adminName: 'Admin Yopoy',
      email: 'adm@yopoy.com',
      password: 'admin-strong-pass',
      confirmPassword: 'admin-strong-pass'
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
      method: 'POST',
      credentials: 'include'
    }));
    expect(res.company.razaoSocial).toBe('Yopoy SA');
  });

  it('deve aceitar cadastro mínimo sem dados empresariais', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        company: { id: 'c-minimal', razaoSocial: 'Meu negócio', nomeFantasia: 'Meu negócio', cnpj: null },
        user: { id: 'u-minimal', email: 'murilo@example.com', role: 'owner' },
        session: { id: 'sess-minimal', expiresAt: '2026-06-22T00:00:00.000Z' }
      })
    });

    const input = {
      companyName: 'Meu negócio',
      adminName: 'Murilo Parra',
      email: 'murilo@example.com',
      password: 'SenhaForte123!',
      confirmPassword: 'SenhaForte123!'
    };

    const res = await AuthApiClient.registerCompany(input);

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
      body: JSON.stringify(input)
    }));
    expect(res.company.razaoSocial).toBe('Meu negócio');
    expect(res.company.cnpj).toBeNull();
  });

  it('deve realizar login com credentials include', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        user: { id: 'u-1', email: 'adm@yopoy.com', role: 'admin' },
        session: { id: 'sess-1' }
      })
    });

    const res = await AuthApiClient.login({
      email: 'adm@yopoy.com',
      password: 'mypassword'
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email: 'adm@yopoy.com', password: 'mypassword' })
    }));
    expect(res.user.email).toBe('adm@yopoy.com');
  });

  it('deve formatar erro amigável de e-mail ou senha inválidos para 401', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({})
    });

    await expect(AuthApiClient.login({
      email: 'wrong@yopoy.com',
      password: 'wrong'
    })).rejects.toThrow('E-mail ou senha inválidos.');
  });

  it('deve formatar erro amigável de CNPJ existente para 409', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({
        error: { code: 'COMPANY_ALREADY_EXISTS', message: 'Empresa existente' }
      })
    });

    await expect(AuthApiClient.registerCompany({
      companyName: 'Yopoy SA',
      adminName: 'Admin Yopoy',
      email: 'adm@yopoy.com',
      password: 'admin-strong-pass',
      confirmPassword: 'admin-strong-pass'
    })).rejects.toThrow('Já existe uma empresa com este CNPJ.');
  });

  it('deve buscar sessão ativa somente pelo cookie', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        authenticated: true,
        session: { userId: 'u-1', role: 'admin' }
      })
    });

    const res = await AuthApiClient.getSession();

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/session', expect.objectContaining({
      method: 'GET',
      credentials: 'include',
      headers: {}
    }));
    expect(res.authenticated).toBe(true);
  });

  it('deve realizar logout com sucesso e limpar cookies passados', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true
    });

    const success = await AuthApiClient.logout('company-uuid-123');
    expect(mockFetch).toHaveBeenCalledWith('/api/auth/logout', expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Yopoy-Company-Id': 'company-uuid-123'
      }
    }));
    expect(success).toBe(true);
  });
});
