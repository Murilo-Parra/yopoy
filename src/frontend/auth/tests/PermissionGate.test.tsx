// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import PermissionGate from '../PermissionGate';
import { usePermission } from '../usePermission';

vi.mock('../usePermission', () => {
  return {
    usePermission: vi.fn()
  };
});

describe('PermissionGate Component Tests', () => {
  beforeEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('nao deve renderizar os filhos nem o fallback enquanto estiver carregando', () => {
    vi.mocked(usePermission).mockReturnValueOnce({
      loading: true,
      allowed: false,
      error: null,
      refresh: vi.fn()
    });

    render(
      <PermissionGate permission="fiscal:nfe:emit" fallback={<div data-testid="fallback">Negado</div>}>
        <button data-testid="secure-btn">Emitir Nota</button>
      </PermissionGate>
    );

    expect(screen.queryByTestId('secure-btn')).toBeNull();
    expect(screen.queryByTestId('fallback')).toBeNull();
  });

  it('deve renderizar os filhos se houver permissao homologada (allowed = true)', () => {
    vi.mocked(usePermission).mockReturnValueOnce({
      loading: false,
      allowed: true,
      error: null,
      refresh: vi.fn()
    });

    render(
      <PermissionGate permission="fiscal:nfe:emit" fallback={<div data-testid="fallback">Negado</div>}>
        <button data-testid="secure-btn">Emitir Nota</button>
      </PermissionGate>
    );

    expect(screen.getByTestId('secure-btn')).not.toBeNull();
    expect(screen.queryByTestId('fallback')).toBeNull();
  });

  it('deve renderizar o fallback se nao for autorizado (allowed = false)', () => {
    vi.mocked(usePermission).mockReturnValueOnce({
      loading: false,
      allowed: false,
      error: null,
      refresh: vi.fn()
    });

    render(
      <PermissionGate permission="fiscal:nfe:emit" fallback={<div data-testid="fallback">Negado</div>}>
        <button data-testid="secure-btn">Emitir Nota</button>
      </PermissionGate>
    );

    expect(screen.queryByTestId('secure-btn')).toBeNull();
    expect(screen.getByTestId('fallback')).not.toBeNull();
  });
});
