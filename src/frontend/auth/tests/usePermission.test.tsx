// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { usePermission } from '../usePermission';
import { PermissionClient } from '../permissionClient';

vi.mock('../permissionClient', () => {
  return {
    PermissionClient: {
      checkPermission: vi.fn()
    }
  };
});

function HookConsumer({ permission }: { permission: string }) {
  const { allowed, loading, error } = usePermission(permission);
  return (
    <div>
      <div data-testid="load-state">{loading ? 'loading' : 'done'}</div>
      <div data-testid="allowed-state">{allowed ? 'allowed' : 'denied'}</div>
      <div data-testid="err-state">{error ? error.message : 'none'}</div>
    </div>
  );
}

describe('usePermission Hook Unit Tests', () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('deve iniciar carregando e nao autorizado por seguranca', async () => {
    let resolvePromise: (value: any) => void = () => {};
    const promise = new Promise<any>((resolve) => { resolvePromise = resolve; });
    vi.mocked(PermissionClient.checkPermission).mockReturnValueOnce(promise);

    render(<HookConsumer permission="finance:view" />);

    expect(screen.getByTestId('load-state').textContent).toBe('loading');
    expect(screen.getByTestId('allowed-state').textContent).toBe('denied');

    await act(async () => {
      resolvePromise({ allowed: true });
    });
  });

  it('deve autorizar quando o backend retornar allowed = true', async () => {
    vi.mocked(PermissionClient.checkPermission).mockResolvedValueOnce({ allowed: true });

    await act(async () => {
      render(<HookConsumer permission="finance:view" />);
    });

    expect(screen.getByTestId('load-state').textContent).toBe('done');
    expect(screen.getByTestId('allowed-state').textContent).toBe('allowed');
  });

  it('deve negar e tratar erros jogados pelo permissionClient', async () => {
    vi.mocked(PermissionClient.checkPermission).mockRejectedValueOnce(new Error('Sessão inválida ou expirada.'));

    await act(async () => {
      render(<HookConsumer permission="fiscal:nfe:emit" />);
    });

    expect(screen.getByTestId('load-state').textContent).toBe('done');
    expect(screen.getByTestId('allowed-state').textContent).toBe('denied');
    expect(screen.getByTestId('err-state').textContent).toBe('Sessão inválida ou expirada.');
  });
});
