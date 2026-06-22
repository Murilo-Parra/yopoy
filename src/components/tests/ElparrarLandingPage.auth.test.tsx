// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ElparrarLandingPage from '../ElparrarLandingPage';

const login = vi.fn();
const registerCompany = vi.fn();

vi.mock('../../frontend/auth/AuthContext', () => ({
  useAuth: () => ({ login, registerCompany })
}));

function renderLanding() {
  return render(
    <ElparrarLandingPage
      theme="light"
      toggleTheme={vi.fn()}
      onSelectPlan={vi.fn()}
      onLoginSuccess={vi.fn()}
    />
  );
}

describe('cadastro e login mínimos', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renderiza somente os cinco campos mínimos no cadastro', async () => {
    renderLanding();
    fireEvent.click(screen.getByRole('button', { name: /^cadastrar$/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /criar conta/i })).toBeTruthy());

    const fields = screen.getAllByRole('textbox').concat(
      Array.from(document.querySelectorAll<HTMLInputElement>('input[type="password"]'))
    );

    expect(screen.getByLabelText(/nome da empresa \/ workspace/i)).toBeTruthy();
    expect(screen.getByLabelText(/^nome completo$/i)).toBeTruthy();
    expect(screen.getByLabelText(/^e-mail$/i)).toBeTruthy();
    expect(screen.getByLabelText(/^senha$/i)).toBeTruthy();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeTruthy();
    expect(fields).toHaveLength(5);
    expect(screen.queryByText(/cnpj/i)).toBeNull();
    expect(screen.queryByText(/logradouro|endereço|cidade|uf \(estado\)/i)).toBeNull();
    expect(screen.queryByText(/regime tributário/i)).toBeNull();
    expect(screen.queryByText(/pagamento|escolher seu plano/i)).toBeNull();
  });

  it('login não pede UUID e envia somente e-mail e senha', async () => {
    login.mockResolvedValueOnce(undefined);
    renderLanding();
    fireEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /acessar yopoy erp/i })).toBeTruthy());

    expect(screen.queryByText(/id da empresa|uuid/i)).toBeNull();
    const emailInput = screen.getByRole('textbox');
    const passwordInput = document.querySelector<HTMLInputElement>('input[type="password"]');
    expect(passwordInput).not.toBeNull();
    fireEvent.change(emailInput, { target: { value: 'murilo@example.com' } });
    fireEvent.change(passwordInput!, { target: { value: 'SenhaForte123!' } });
    fireEvent.submit(emailInput.closest('form')!);

    await waitFor(() => expect(login).toHaveBeenCalledWith('murilo@example.com', 'SenhaForte123!'));
  });
});
