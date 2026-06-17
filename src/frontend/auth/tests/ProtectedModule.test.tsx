// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ProtectedModule from '../ProtectedModule';
import { useAuth } from '../AuthContext';
import { usePermission } from '../usePermission';

vi.mock('../AuthContext', () => {
  return {
    useAuth: vi.fn()
  };
});

vi.mock('../usePermission', () => {
  return {
    usePermission: vi.fn()
  };
});

describe('ProtectedModule Component Tests', () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('deve exibir animação de autenticando enquanto valida sessão ou permissão', () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      authenticated: false,
      loading: true,
      user: null,
      session: null,
      companyId: null,
      login: vi.fn(),
      logout: vi.fn(),
      registerCompany: vi.fn(),
      requirePermission: vi.fn(),
      refreshSession: vi.fn()
    });

    vi.mocked(usePermission).mockReturnValueOnce({
      loading: true,
      allowed: false,
      error: null,
      refresh: vi.fn()
    });

    render(
      <ProtectedModule permission="finance:view">
        <div data-testid="secret-module">Painel Financeiro</div>
      </ProtectedModule>
    );

    expect(screen.queryByTestId('secret-module')).toBeNull();
    expect(screen.getByText(/Autenticando e verificando permissões.../i)).not.toBeNull();
  });

  it('deve bloquear usuário não autenticado exibindo AccessDenied', () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      authenticated: false,
      loading: false,
      user: null,
      session: null,
      companyId: null,
      login: vi.fn(),
      logout: vi.fn(),
      registerCompany: vi.fn(),
      requirePermission: vi.fn(),
      refreshSession: vi.fn()
    });

    vi.mocked(usePermission).mockReturnValueOnce({
      loading: false,
      allowed: true,
      error: null,
      refresh: vi.fn()
    });

    render(
      <ProtectedModule permission="logistics:view">
        <div data-testid="secret-module">Painel Logística</div>
      </ProtectedModule>
    );

    expect(screen.queryByTestId('secret-module')).toBeNull();
    expect(screen.getByText(/Acesso não autorizado/i)).not.toBeNull();
  });

  it('deve bloquear usuário autenticado sem permissão específica exibindo AccessDenied', () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      authenticated: true,
      loading: false,
      user: { email: 'user@yopoy.com' },
      session: { id: 'sess-1' },
      companyId: 'comp-1',
      login: vi.fn(),
      logout: vi.fn(),
      registerCompany: vi.fn(),
      requirePermission: vi.fn(),
      refreshSession: vi.fn()
    });

    vi.mocked(usePermission).mockReturnValueOnce({
      loading: false,
      allowed: false,
      error: null,
      refresh: vi.fn()
    });

    render(
      <ProtectedModule permission="admin:view">
        <div data-testid="secret-module">Painel Admin</div>
      </ProtectedModule>
    );

    expect(screen.queryByTestId('secret-module')).toBeNull();
    expect(screen.getByText(/Acesso não autorizado/i)).not.toBeNull();
  });

  it('deve renderizar o modulo quando sessao e permissões forem válidas', () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      authenticated: true,
      loading: false,
      user: { email: 'user@yopoy.com' },
      session: { id: 'sess-1' },
      companyId: 'comp-1',
      login: vi.fn(),
      logout: vi.fn(),
      registerCompany: vi.fn(),
      requirePermission: vi.fn(),
      refreshSession: vi.fn()
    });

    vi.mocked(usePermission).mockReturnValueOnce({
      loading: false,
      allowed: true,
      error: null,
      refresh: vi.fn()
    });

    render(
      <ProtectedModule permission="logistics:view">
        <div data-testid="secret-module">Painel Logística</div>
      </ProtectedModule>
    );

    expect(screen.getByTestId('secret-module').textContent).toBe('Painel Logística');
    expect(screen.queryByText(/Acesso não autorizado/i)).toBeNull();
  });
});
