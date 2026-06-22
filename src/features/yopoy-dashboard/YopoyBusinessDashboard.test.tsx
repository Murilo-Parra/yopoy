// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { YopoyBusinessDashboard } from './YopoyBusinessDashboard';

describe('YopoyBusinessDashboard', () => {
  afterEach(cleanup);

  it('renderiza uma visão geral separada da Mesa', () => {
    render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /painel de controle/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /visão geral do negócio/i })).toBeTruthy();
    expect(screen.getByText(/faturamento hoje/i)).toBeTruthy();
    expect(screen.getByText(/próximas ações/i)).toBeTruthy();
    expect(screen.getByText(/visão demonstrativa do negócio/i)).toBeTruthy();
    expect(screen.getByText(/nenhuma operação fiscal ou externa/i)).toBeTruthy();
    expect(screen.queryByText(/central visual do yopoy/i)).toBeNull();
  });

  it('oferece atalho explícito para a Mesa de Tarefas', () => {
    const onOpenTaskBoard = vi.fn();
    render(<YopoyBusinessDashboard theme="dark" onOpenTaskBoard={onOpenTaskBoard} />);

    fireEvent.click(screen.getByRole('button', { name: /abrir mesa de tarefas/i }));
    expect(onOpenTaskBoard).toHaveBeenCalledTimes(1);
  });
});
