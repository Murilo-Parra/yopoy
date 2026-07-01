// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import InvoiceTool from './InvoiceTool';
import NfcePosTool from './NfcePosTool';
import NfseTool from './NfseTool';
import { writeTaskCanvasSnapshot } from '../features/yopoy-central-do-dia/taskCanvasStorage';

describe('áreas fiscais visuais do MVP', () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('apresenta a área principal como pré-nota interna sem valor fiscal', () => {
    render(<InvoiceTool />);
    expect(screen.getByRole('heading', { name: /pré-nota interna/i })).toBeTruthy();
    expect(screen.getByText(/rascunhos sem valor fiscal/i)).toBeTruthy();
    expect(screen.getByText(/emissão fiscal real está bloqueada/i)).toBeTruthy();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('mantém o InvoiceTool como pré-nota interna sem emissão fiscal real', () => {
    render(<InvoiceTool />);
    expect(screen.getByText(/preparação para o contador/i)).toBeTruthy();
    cleanup();

    writeTaskCanvasSnapshot({
      version: 1,
      items: [{
        id: 'pre-invoice-guard-1',
        kind: 'pre-invoice',
        title: 'Pré-nota de teste local',
        description: 'Rascunho interno criado na Mesa Visual.',
        timeLabel: 'Hoje',
        status: 'pending',
        archived: false,
        linked: false,
        hasPreInvoice: true,
        amount: 120,
        sentToAccountant: false,
        sentToPreInvoices: true,
      }],
      connections: [],
      positions: {},
      activeFilter: 'all',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });

    const { container } = render(<InvoiceTool />);
    const pageCopy = container.textContent ?? '';

    expect(pageCopy).toMatch(/pré-nota visual interna/i);
    expect(pageCopy).toMatch(/rascunho interno/i);
    expect(pageCopy).toMatch(/origem local/i);
    expect(pageCopy).toMatch(/sem valor fiscal/i);
    expect(pageCopy).toMatch(/sem emissão real/i);
    expect(pageCopy).toMatch(/sem transmissão/i);
    expect(pageCopy).toMatch(/sem autorização fiscal/i);
    expect(pageCopy).toMatch(/não é NF-e, NFC-e ou NFS-e/i);
    expect(pageCopy).toMatch(/contador/i);

    fireEvent.click(screen.getByRole('button', { name: /abrir pré-nota/i }));
    const dialogCopy = screen.getByRole('dialog', { name: /pré-nota visual interna/i }).textContent ?? '';

    expect(dialogCopy).toMatch(/não foi transmitido à SEFAZ/i);
    expect(dialogCopy).toMatch(/não possui chave de acesso/i);
    expect(dialogCopy).toMatch(/não possui protocolo fiscal/i);

    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/emissão fiscal real disponível/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/emitir nota fiscal real/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/transmitir para SEFAZ/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/autorizado pela SEFAZ/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/protocolo fiscal autorizado/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/chave de acesso válida/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/NF-e autorizada/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/NFC-e autorizada/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/NFS-e autorizada/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/DANFE real/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/XML fiscal real/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/certificado operacional/i);
    expect(`${pageCopy} ${dialogCopy}`).not.toMatch(/assinatura digital operacional/i);
  });

  it('mantém NFC-e e NFS-e reais explicitamente bloqueadas', () => {
    const { rerender } = render(<NfcePosTool />);
    expect(screen.getByText(/NFC-e real permanece bloqueada/i)).toBeTruthy();
    expect(screen.getByText(/não é emitida/i)).toBeTruthy();

    rerender(<NfseTool />);
    expect(screen.getByText(/NFS-e real permanece bloqueada/i)).toBeTruthy();
    expect(screen.getByText(/sem valor fiscal/i)).toBeTruthy();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
