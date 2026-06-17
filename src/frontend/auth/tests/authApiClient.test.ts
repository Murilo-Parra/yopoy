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
      company: {
        razaoSocial: 'Yopoy SA',
        cnpj: '111',
        email: 'adm@yopoy.com',
        endereco: { rua: 'Test', numero: '1', cidade: 'SP', uf: 'SP' },
        regimeTributario: 'simples_nacional'
      },
      admin: {
        nomeCompleto: 'Admin Yopoy',
        email: 'adm@yopoy.com',
        senha: 'admin-strong-pass',
        confirmarSenha: 'admin-strong-pass'
      }
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/register-company', expect.objectContaining({
      method: 'POST',
      credentials: 'include'
    }));
    expect(res.company.razaoSocial).toBe('Yopoy SA');
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
      companyId: 'company-uuid',
      email: 'adm@yopoy.com',
      password: 'mypassword'
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
      method: 'POST',
      credentials: 'include'
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
      companyId: 'company-uuid',
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
      company: {
        razaoSocial: 'Yopoy SA',
        cnpj: '111',
        email: 'adm@yopoy.com',
        endereco: { rua: 'Test', numero: '1', cidade: 'SP', uf: 'SP' },
        regimeTributario: 'simples_nacional'
      },
      admin: {
        nomeCompleto: 'Admin Yopoy',
        email: 'adm@yopoy.com',
        senha: 'admin-strong-pass',
        confirmarSenha: 'admin-strong-pass'
      }
    })).rejects.toThrow('Já existe uma empresa com este CNPJ.');
  });

  it('deve buscar sessão ativa incluindo header X-Yopoy-Company-Id', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        authenticated: true,
        session: { userId: 'u-1', role: 'admin' }
      })
    });

    const res = await AuthApiClient.getSession('company-uuid-123');

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/session', expect.objectContaining({
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Yopoy-Company-Id': 'company-uuid-123'
      }
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
