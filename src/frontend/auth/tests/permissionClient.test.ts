// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PermissionClient } from '../permissionClient';

describe('PermissionClient Unit Tests', () => {
  const mockFetch = vi.fn();
  vi.stubGlobal('fetch', mockFetch);

  beforeEach(() => {
    mockFetch.mockReset();
    sessionStorage.clear();
  });

  it('deve realizar chamada POST para require-permission com credentials include', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ allowed: true })
    });

    const res = await PermissionClient.checkPermission('fiscal:nfe:emit');

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/require-permission', expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ permission: 'fiscal:nfe:emit' })
    }));
    expect(res.allowed).toBe(true);
  });

  it('deve enviar o header X-Yopoy-Company-Id quando companyId existir no sessionStorage', async () => {
    sessionStorage.setItem('yopoy_company_id', 'client-company-id-777');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ allowed: false })
    });

    const res = await PermissionClient.checkPermission('admin:view');

    expect(mockFetch).toHaveBeenCalledWith('/api/auth/require-permission', expect.objectContaining({
      headers: expect.objectContaining({
        'X-Yopoy-Company-Id': 'client-company-id-777'
      })
    }));
    expect(res.allowed).toBe(false);
  });

  it('deve tratar status 401 lencando erro de sessao invalida', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({})
    });

    await expect(PermissionClient.checkPermission('inventory:view'))
      .rejects.toThrow('Sessão inválida ou expirada.');
  });

  it('deve retornar allowed = false sob status 403 (acesso negado)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({})
    });

    const res = await PermissionClient.checkPermission('system:factory_reset');
    expect(res.allowed).toBe(false);
  });

  it('deve tratar erro inesperado retornando allowed = false por padrao', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network offline'));

    const res = await PermissionClient.checkPermission('dashboard:view');
    expect(res.allowed).toBe(false);
  });
});
