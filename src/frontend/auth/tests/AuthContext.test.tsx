// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { AuthApiClient } from '../authApiClient';

// Mock the API Client so we don't trigger real network fetches
vi.mock('../authApiClient', () => {
  return {
    AuthApiClient: {
      getSession: vi.fn(),
      login: vi.fn(),
      registerCompany: vi.fn(),
      logout: vi.fn(),
      requirePermission: vi.fn()
    }
  };
});

// A small consumer component to test values in the DOM
function TestConsumer() {
  const { authenticated, loading, companyId, user, session, login, logout, registerCompany } = useAuth();

  return (
    <div>
      <div data-testid="status">{loading ? 'loading' : authenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="companyId">{companyId || 'none'}</div>
      <div data-testid="user-email">{user?.email || 'none'}</div>
      
      <button data-testid="btn-login" onClick={() => login('c-1', 'adm@yopoy.com', 'p-1')}>Login</button>
      <button data-testid="btn-logout" onClick={() => logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext Integration Tests', () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
    sessionStorage.clear();
  });

  it('deve inicializar deslogado quando não houver company_id no sessionStorage', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
    expect(screen.getByTestId('companyId').textContent).toBe('none');
  });

  it('deve recuperar a sessão automaticamente ao carregar se houver company_id válido', async () => {
    sessionStorage.setItem('yopoy_company_id', 'saved-c-id');
    
    vi.mocked(AuthApiClient.getSession).mockResolvedValueOnce({
      authenticated: true,
      session: {
        id: 'sess-123',
        companyId: 'saved-c-id',
        userId: 'u-1',
        email: 'adm@yopoy.com',
        role: 'admin'
      }
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('status').textContent).toBe('authenticated');
    expect(screen.getByTestId('companyId').textContent).toBe('saved-c-id');
    expect(screen.getByTestId('user-email').textContent).toBe('adm@yopoy.com');
  });

  it('deve efetuar login com sucesso e atualizar contexto e sessionStorage', async () => {
    vi.mocked(AuthApiClient.login).mockResolvedValueOnce({
      ok: true,
      user: {
        id: 'u-12',
        companyId: 'c-1',
        fullName: 'Admin Yopoy',
        email: 'adm@yopoy.com',
        role: 'admin'
      },
      session: {
        id: 'sess-abc',
        expiresAt: '2026-12-31'
      }
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    // Clicar no botão de login
    const loginBtn = screen.getByTestId('btn-login');
    await act(async () => {
      loginBtn.click();
    });

    expect(AuthApiClient.login).toHaveBeenCalledWith({
      companyId: 'c-1',
      email: 'adm@yopoy.com',
      password: 'p-1'
    });

    expect(screen.getByTestId('status').textContent).toBe('authenticated');
    expect(screen.getByTestId('companyId').textContent).toBe('c-1');
    expect(screen.getByTestId('user-email').textContent).toBe('adm@yopoy.com');
    expect(sessionStorage.getItem('yopoy_company_id')).toBe('c-1');
  });

  it('deve efetuar logout, limpar sessionStorage e deslogar do backend', async () => {
    sessionStorage.setItem('yopoy_company_id', 'active-c-1');
    
    vi.mocked(AuthApiClient.getSession).mockResolvedValueOnce({
      authenticated: true,
      session: {
        id: 'sess-abc',
        companyId: 'active-c-1',
        userId: 'u-1',
        email: 'adm@yopoy.com',
        role: 'admin'
      }
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('status').textContent).toBe('authenticated');

    const logoutBtn = screen.getByTestId('btn-logout');
    await act(async () => {
      logoutBtn.click();
    });

    expect(AuthApiClient.logout).toHaveBeenCalledWith('active-c-1');
    expect(screen.getByTestId('status').textContent).toBe('unauthenticated');
    expect(sessionStorage.getItem('yopoy_company_id')).toBeNull();
  });
});
