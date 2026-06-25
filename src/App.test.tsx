// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const authMock = vi.hoisted(() => ({
  user: {
    id: 'user-test',
    email: 'user@example.com',
    role: 'owner',
    plan: 'micro',
    name: 'Empresa Teste',
    isSubUser: false,
    allowedTabs: [] as string[],
  },
}));

vi.mock('./frontend/auth/AuthContext', () => {
  const logout = vi.fn();
  const refreshSession = vi.fn();
  return {
    useAuth: () => ({
      authenticated: true,
      loading: false,
      user: authMock.user,
      companyId: 'company-test',
      logout,
      refreshSession,
    }),
  };
});

vi.mock('./components/ElparrarLandingPage', () => ({ default: () => <div>Página inicial</div> }));
vi.mock('./components/OnboardingTutorial', () => ({ default: () => null }));
vi.mock('./components/FinanceTool', () => ({ default: () => <h1>Financeiro liberado</h1> }));
vi.mock('./features/yopoy-dashboard', () => ({
  YopoyBusinessDashboard: ({ onOpenTaskBoard }: { onOpenTaskBoard: () => void }) => (
    <div><h1>Dashboard de teste</h1><button onClick={onOpenTaskBoard}>Abrir Mesa pelo Dashboard</button></div>
  ),
}));
vi.mock('./features/yopoy-central-do-dia/YopoyCentralDashboard', () => ({
  YopoyCentralDashboard: () => <h1>Mesa operacional de teste</h1>,
}));

describe('navegação principal do App', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('biz_onboarding_tutorial_viewed', 'true');
    authMock.user.role = 'owner';
    authMock.user.isSubUser = false;
    authMock.user.allowedTabs = [];
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('abre no Dashboard e mantém a Mesa em uma aba separada', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByRole('heading', { name: /dashboard de teste/i })).toBeTruthy());
    expect(screen.queryByRole('heading', { name: /mesa operacional de teste/i })).toBeNull();
    expect(screen.getAllByRole('button', { name: /mesa de tarefas/i }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /abrir mesa pelo dashboard/i }));
    expect(screen.getByRole('heading', { name: /mesa operacional de teste/i })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /dashboard de teste/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /painel de controle/i }));
    expect(screen.getByRole('heading', { name: /dashboard de teste/i })).toBeTruthy();
  });

  it('mantém as ferramentas principais visíveis e acessíveis para owner mesmo no plano micro', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByRole('heading', { name: /dashboard de teste/i })).toBeTruthy());
    expect(screen.getAllByRole('button', { name: /mesa de tarefas/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /módulo contábil|contas\/equipe/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /logística/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /hierarquia/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /orientação ia|^ia$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /configurações|configs/i }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /módulo contábil/i }));
    expect(screen.getByRole('heading', { name: /financeiro liberado/i })).toBeTruthy();
    expect(screen.queryByText(/acesso negado/i)).toBeNull();
  });

  it('apresenta somente a área interna de pré-nota no menu principal', async () => {
    render(<App />);

    await waitFor(() => expect(screen.getByRole('heading', { name: /dashboard de teste/i })).toBeTruthy());
    const internalAreaButtons = screen.getAllByRole('button', { name: /pré-nota \/ contador/i });
    expect(internalAreaButtons.length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /emitir nota|emitir nf-e|nfs-e|nfce|nfc-e/i })).toBeNull();

    fireEvent.click(internalAreaButtons[0]);
    expect(screen.getByRole('heading', { name: /pré-nota interna e preparação para contador/i })).toBeTruthy();
    expect(screen.getByText(/não emitido e sem valor fiscal/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /^pré-nota interna$/i })).toBeTruthy();
  });

  it('mantém allowedTabs obrigatório para subusuário mesmo com papel owner inconsistente', async () => {
    authMock.user.role = 'owner';
    authMock.user.isSubUser = true;
    authMock.user.allowedTabs = ['dashboard'];

    render(<App />);

    await waitFor(() => expect(screen.getByRole('heading', { name: /dashboard de teste/i })).toBeTruthy());
    expect(screen.getAllByRole('button', { name: /mesa de tarefas/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /módulo contábil/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /^logística/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /^configurações$/i })).toBeNull();
  });
});
