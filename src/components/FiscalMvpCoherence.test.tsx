// @vitest-environment jsdom
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import InvoiceTool from './InvoiceTool';
import NfcePosTool from './NfcePosTool';
import NfseTool from './NfseTool';

describe('áreas fiscais visuais do MVP', () => {
  afterEach(cleanup);

  it('apresenta a área principal como pré-nota interna sem valor fiscal', () => {
    render(<InvoiceTool />);
    expect(screen.getByRole('heading', { name: /pré-nota interna/i })).toBeTruthy();
    expect(screen.getByText(/rascunhos sem valor fiscal/i)).toBeTruthy();
    expect(screen.getByText(/emissão fiscal real está bloqueada/i)).toBeTruthy();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
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
