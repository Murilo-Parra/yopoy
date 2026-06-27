// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { YopoyCentralDashboard } from './YopoyCentralDashboard';
import { CanvasCardConnection, CanvasCardPosition, SmartCardItem } from './types';

const STORAGE_KEY = 'yopoy:task-canvas:v1';

interface StoredTaskCanvasSnapshot {
  version: 1;
  items: SmartCardItem[];
  positions: Record<string, CanvasCardPosition>;
  connections: CanvasCardConnection[];
  activeFilter: string;
  updatedAt: string;
}

function getCaptureCard() {
  return within(screen.getByTestId('canvas-node-mock-capture-01')).getByRole('heading', { name: /foto de comprovante/i }).closest('article') as HTMLElement;
}

function getPaymentCard() {
  return within(screen.getByTestId('canvas-node-mock-payment-01')).getByRole('heading', { name: /comprovante pix/i }).closest('article') as HTMLElement;
}

function selectCard(card: HTMLElement) {
  fireEvent.pointerDown(card, { pointerId: 91, button: 0, clientX: 100, clientY: 100 });
  fireEvent.pointerUp(card, { pointerId: 91, clientX: 100, clientY: 100 });
}

function readStoredSnapshot(): StoredTaskCanvasSnapshot {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  expect(stored).not.toBeNull();
  return JSON.parse(stored ?? '') as StoredTaskCanvasSnapshot;
}

function openQuickRegistration() {
  fireEvent.click(screen.getByRole('button', { name: /registro rápido/i }));
}

function fillQuickRegistration(values: {
  type?: string;
  title: string;
  description?: string;
  amount?: string;
  tags?: string;
}) {
  if (values.type) {
    fireEvent.change(screen.getByLabelText(/^tipo$/i), { target: { value: values.type } });
  }
  fireEvent.change(screen.getByLabelText(/^título$/i), { target: { value: values.title } });
  if (values.description !== undefined) {
    fireEvent.change(screen.getByLabelText(/^descrição$/i), { target: { value: values.description } });
  }
  if (values.amount !== undefined) {
    fireEvent.change(screen.getByLabelText(/^valor$/i), { target: { value: values.amount } });
  }
  if (values.tags !== undefined) {
    fireEvent.change(screen.getByLabelText(/^tags$/i), { target: { value: values.tags } });
  }
}

function createQuickCard(values: {
  type?: string;
  title: string;
  description?: string;
  amount?: string;
  tags?: string;
}) {
  openQuickRegistration();
  fillQuickRegistration(values);
  fireEvent.click(screen.getByRole('button', { name: /criar card/i }));
}

function createFolder(name: string) {
  fireEvent.change(screen.getByLabelText(/^criar pasta$/i), { target: { value: name } });
  fireEvent.click(screen.getByRole('button', { name: /^criar pasta$/i }));
}

function getFolderCard(name: RegExp) {
  const folderHeading = screen.getAllByRole('heading', { name })
    .find((heading) => heading.closest('article')?.dataset.cardId?.startsWith('folder-'));
  expect(folderHeading).toBeTruthy();
  return folderHeading?.closest('article') as HTMLElement;
}

function connectCaptureToPayment() {
  const source = screen.getByRole('button', { name: /iniciar conexão de foto de comprovante/i });
  const target = screen.getByRole('button', { name: /conectar em comprovante pix/i });
  fireEvent.pointerDown(source, { pointerId: 9, button: 0, clientX: 1144, clientY: 112 });
  fireEvent.pointerMove(screen.getByTestId('task-canvas'), { pointerId: 9, clientX: 430, clientY: 700 });
  fireEvent.pointerUp(target, { pointerId: 9, clientX: 434, clientY: 682 });
}

function writeSnapshotWithAccountantPackageMockAsPending(partialSnapshot: Partial<StoredTaskCanvasSnapshot> = {}) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: 1,
    items: [
      {
        id: 'mock-package-01',
        kind: 'pending',
        title: 'Agrupamento visual sem pacote',
        description: 'Card local usado para manter o estado vazio do pacote.',
        timeLabel: 'agora',
        status: 'pending',
        archived: false,
        linked: false,
        hasPreInvoice: false,
        sentToAccountant: false,
        tags: ['Controle interno'],
      },
      ...(partialSnapshot.items ?? []),
    ],
    positions: partialSnapshot.positions ?? {},
    connections: partialSnapshot.connections ?? [],
    activeFilter: partialSnapshot.activeFilter ?? 'all',
    updatedAt: partialSnapshot.updatedAt ?? '2026-06-25T12:00:00.000Z',
  }));
}

describe('YopoyCentralDashboard', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', { configurable: true, value: vi.fn(() => true) });
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renderiza um canvas livre com mocks e ações no painel contextual', () => {
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /mesa visual/i })).toBeTruthy();
    expect(screen.getByText(/comece pela mesa/i)).toBeTruthy();
    expect(screen.getByTestId('task-canvas')).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/ficha operacional/i)).toBeTruthy();
    expect(within(getCaptureCard()).queryByText(/ações alternativas/i)).toBeNull();
    expect(screen.getByText(/nenhum card selecionado/i)).toBeTruthy();
    expect(screen.getByText(/demonstração salva localmente/i)).toBeTruthy();
    expect(screen.getAllByText(/salvas neste navegador/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sem sincronização externa/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/pré-notas são visuais, sem valor fiscal/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /registro rápido/i })).toBeTruthy();
    expect(screen.getByText(/registre agora, organize depois/i)).toBeTruthy();
    expect(screen.getByText(/este card fica salvo neste navegador/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /pacote local para contador/i })).toBeTruthy();
    expect(screen.getAllByText(/separado neste navegador/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sem envio automático/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sem valor fiscal/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/revise antes de compartilhar manualmente com o contador/i).length).toBeGreaterThan(0);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    selectCard(getCaptureCard());
    expect(within(getCaptureCard()).getByText(/selecionado/i)).toBeTruthy();
    expect(screen.getAllByRole('heading', { name: /foto de comprovante pix/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/ações do card selecionado/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /avançar para pendente/i }));
    expect(within(getCaptureCard()).getByText(/^pendente$/i)).toBeTruthy();
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(screen.getByText(/no celular: arraste pelo corpo do card/i)).toBeTruthy();
  });

  it('mostra controles de zoom, aplica escala e ajusta a visão ao conteúdo', () => {
    render(<YopoyCentralDashboard theme="light" />);
    const viewport = screen.getByTestId('task-canvas-viewport');
    const scrollTo = vi.fn();
    Object.defineProperty(viewport, 'clientWidth', { configurable: true, value: 640 });
    Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 420 });
    Object.defineProperty(viewport, 'scrollTo', { configurable: true, value: scrollTo });
    Object.defineProperty(window, 'requestAnimationFrame', { configurable: true, value: (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    } });

    expect(screen.getByText(/zoom da mesa/i)).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(1)');

    fireEvent.click(screen.getByRole('button', { name: /diminuir zoom/i }));
    expect(screen.getByText('75%')).toBeTruthy();
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(0.75)');

    fireEvent.click(screen.getByRole('button', { name: /zoom 100%/i }));
    fireEvent.click(screen.getByRole('button', { name: /aumentar zoom/i }));
    expect(screen.getByText('125%')).toBeTruthy();
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(1.25)');

    fireEvent.click(screen.getByRole('button', { name: /ajustar visão/i }));
    expect(screen.getByText('50%')).toBeTruthy();
    expect(screen.getByText(/visão ajustada ao conteúdo visível da mesa/i)).toBeTruthy();
    expect(scrollTo).toHaveBeenCalled();
  });

  it('cria pasta local, salva no snapshot e abre submesa vazia pelo painel', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1771771773000);
    vi.spyOn(Math, 'random').mockReturnValue(0.345678);
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByLabelText(/^criar pasta$/i)).toBeTruthy();
    expect(screen.getByText(/pastas são locais e servem para organizar cards/i)).toBeTruthy();

    createFolder('Mesa 1');

    expect(screen.getByText(/pasta criada localmente nesta mesa/i)).toBeTruthy();
    const folderCard = getFolderCard(/^mesa 1$/i);
    expect(within(folderCard).getAllByText(/submesa local/i).length).toBeGreaterThan(0);
    expect(within(folderCard).getByText(/0 card\(s\) nesta pasta/i)).toBeTruthy();
    expect(within(folderCard).queryByText(/R\$/i)).toBeNull();

    await waitFor(() => {
      const folder = readStoredSnapshot().items.find((item) => item.title === 'Mesa 1');
      expect(folder?.id.startsWith('folder-1771771773000-')).toBe(true);
      expect(folder?.kind).toBe('folder');
      expect(folder?.parentFolderId).toBeNull();
    });

    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));

    expect(screen.getByRole('heading', { name: /submesa: mesa 1/i })).toBeTruthy();
    expect(screen.getByText(/mesa principal \/ mesa 1/i)).toBeTruthy();
    expect(screen.getByText(/esta pasta ainda está vazia/i)).toBeTruthy();
    expect(screen.getByText(/volte para a mesa principal e mova cards para cá/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /voltar para mesa principal/i }));
    expect(screen.getByRole('heading', { name: /^mesa visual$/i })).toBeTruthy();
    expect(getFolderCard(/^mesa 1$/i)).toBeTruthy();
  });

  it('move card para pasta, organiza dentro da submesa e volta para a Mesa principal', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.spyOn(Date, 'now').mockReturnValue(1771771774000);
    vi.spyOn(Math, 'random').mockReturnValue(0.456789);
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Caixa da noite');
    expect(screen.getByRole('heading', { name: /comanda mesa 1/i })).toBeTruthy();
    const saleCard = screen.getByRole('heading', { name: /comanda mesa 1/i }).closest('article') as HTMLElement;
    selectCard(saleCard);

    const panel = screen.getByLabelText(/painel contextual do card/i);
    expect(within(panel).getAllByText(/mover para pasta/i).length).toBeGreaterThan(0);
    fireEvent.click(within(panel).getByRole('button', { name: /^mover para pasta$/i }));

    expect(screen.getByText(/card movido para a pasta local/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /comanda mesa 1/i })).toBeNull();

    selectCard(getFolderCard(/caixa da noite/i));
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    expect(screen.getByRole('heading', { name: /submesa: caixa da noite/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /comanda mesa 1/i })).toBeTruthy();

    const movedCard = screen.getByRole('heading', { name: /comanda mesa 1/i }).closest('article') as HTMLElement;
    selectCard(movedCard);
    expect(screen.getByText(/este card está em/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /mover para mesa principal/i }));
    expect(screen.getByText(/card voltou para a mesa principal/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /comanda mesa 1/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /voltar para mesa principal/i }));
    expect(screen.getByRole('heading', { name: /comanda mesa 1/i })).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.items.find((item) => item.id === 'mock-sale-01')?.parentFolderId).toBeNull();
      expect(JSON.stringify(snapshot)).not.toMatch(/activeFolderId|selectedCardId|canvasZoom/i);
    });
  });

  it('cria card dentro da pasta, persiste parentFolderId e mantém raiz separada', async () => {
    vi.spyOn(Date, 'now')
      .mockReturnValueOnce(1771771775000)
      .mockReturnValueOnce(1771771776000);
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.567891)
      .mockReturnValueOnce(0.678912);
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Pedidos iFood');
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    createQuickCard({ type: 'payment', title: 'Recebimento dentro da pasta', amount: '31,90' });

    expect(screen.getByText(/card criado dentro desta pasta local/i)).toBeTruthy();
    expect(screen.getAllByRole('heading', { name: /recebimento dentro da pasta/i }).length).toBeGreaterThan(0);

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const folder = snapshot.items.find((item) => item.kind === 'folder' && item.title === 'Pedidos iFood');
      const created = snapshot.items.find((item) => item.title === 'Recebimento dentro da pasta');
      expect(created?.parentFolderId).toBe(folder?.id);
    });

    fireEvent.click(screen.getByRole('button', { name: /voltar para mesa principal/i }));
    expect(screen.queryByRole('heading', { name: /recebimento dentro da pasta/i })).toBeNull();

    selectCard(getFolderCard(/pedidos ifood/i));
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    expect(screen.getByRole('heading', { name: /recebimento dentro da pasta/i })).toBeTruthy();
  });

  it('deriva tamanho expansível do canvas quando há card em posição distante', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [{ id: 'mock-capture-01', status: 'ready' }],
      positions: { 'mock-capture-01': { x: 2400, y: 2600 } },
      connections: [],
      activeFilter: 'ready',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByTestId('task-canvas').style.width).toBe('3200px');
    expect(screen.getByTestId('task-canvas').style.height).toBe('3340px');
    expect(screen.getByTestId('task-canvas-scroll-surface').style.width).toBe('3200px');
    expect(screen.getByTestId('task-canvas-scroll-surface').style.height).toBe('3340px');
    expect(screen.getByTestId('canvas-node-mock-capture-01').style.left).toBe('2400px');
  });

  it('mostra estado vazio quando não há cards separados para contador', () => {
    writeSnapshotWithAccountantPackageMockAsPending();

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /pacote local para contador/i })).toBeTruthy();
    expect(screen.getByText(/nenhum card separado para contador ainda/i)).toBeTruthy();
    expect(screen.getByText(/use a ação ‘separar contador’ em um card da mesa/i)).toBeTruthy();
  });

  it('abre e fecha o formulário de registro rápido e exige título', () => {
    render(<YopoyCentralDashboard theme="light" />);

    openQuickRegistration();

    expect(screen.getByLabelText(/^tipo$/i)).toBeTruthy();
    expect(screen.getByLabelText(/^título$/i)).toBeTruthy();
    expect(screen.getByText(/controle interno, sem emissão fiscal/i)).toBeTruthy();
    expect(screen.getByText(/salvo apenas neste navegador/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /criar card/i }));
    expect(screen.getByRole('alert').textContent).toMatch(/informe um título/i);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(screen.queryByLabelText(/^título$/i)).toBeNull();
  });

  it('cria venda interna local, salva no canvas e restaura em novo render sem chamar backend', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.spyOn(Date, 'now').mockReturnValue(1771771771000);
    vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    render(<YopoyCentralDashboard theme="light" />);
    const viewport = screen.getByTestId('task-canvas-viewport');
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, value: 320 });
    Object.defineProperty(viewport, 'scrollTop', { configurable: true, value: 180 });

    createQuickCard({
      type: 'sale',
      title: 'Venda interna balcão',
      description: 'Controle interno da venda.',
      amount: '185,50',
      tags: 'Balcão, Sem nota',
    });

    expect(screen.getByText(/card criado e salvo neste navegador/i)).toBeTruthy();
    expect(screen.getAllByRole('heading', { name: /venda interna balcão/i }).length).toBeGreaterThan(0);
    expect(screen.getByTestId('canvas-node-local-1771771771000-4fzyo8')).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const created = snapshot.items.find((item) => item.id === 'local-1771771771000-4fzyo8');
      expect(created?.kind).toBe('sale');
      expect(created?.status).toBe('new');
      expect(created?.archived).toBe(false);
      expect(created?.linked).toBe(false);
      expect(created?.hasPreInvoice).toBe(false);
      expect(created?.sentToAccountant).toBe(false);
      expect(created?.amount).toBe(185.5);
      expect(created?.tags).toEqual(['Balcão', 'Sem nota']);
      expect(snapshot.positions['local-1771771771000-4fzyo8']).toEqual({ x: 344, y: 204 });
      expect(JSON.stringify(snapshot)).not.toMatch(/sefaz|xml|danfe|protocolo|nf-e|nfc-e|nfs-e/i);
    });

    cleanup();
    render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByRole('heading', { name: /venda interna balcão/i })).toBeTruthy();
  });

  it('separa card para contador, salva sentToAccountant e restaura o pacote local do snapshot', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    writeSnapshotWithAccountantPackageMockAsPending();
    render(<YopoyCentralDashboard theme="light" />);
    const saleCard = screen.getByRole('heading', { name: /comanda mesa 1/i }).closest('article') as HTMLElement;

    selectCard(saleCard);
    fireEvent.click(screen.getByRole('button', { name: /separar para contador/i }));

    expect(screen.getByText(/card separado localmente para o contador\. nenhum dado saiu do navegador/i)).toBeTruthy();
    expect(screen.getByTestId('accountant-package-item-mock-sale-01')).toBeTruthy();
    expect(within(screen.getByTestId('accountant-package-item-mock-sale-01')).getByText(/venda interna · pendente/i)).toBeTruthy();
    const packageContentDetails = screen.getByText(/resumo local visível e cards separados/i).closest('details') as HTMLDetailsElement;
    expect(packageContentDetails.open).toBe(false);
    fireEvent.click(screen.getByText(/resumo local visível e cards separados/i));
    expect(packageContentDetails.open).toBe(true);
    fireEvent.click(screen.getByText(/resumo local visível e cards separados/i));
    expect(packageContentDetails.open).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.items.find((item) => item.id === 'mock-sale-01')?.sentToAccountant).toBe(true);
    });

    cleanup();
    render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByTestId('accountant-package-item-mock-sale-01')).toBeTruthy();
  });

  it('gera resumo local com título, tipo, status, valor e usa clipboard quando disponível', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    writeSnapshotWithAccountantPackageMockAsPending({
      items: [{
        id: 'mock-sale-01',
        kind: 'sale',
        title: 'Venda separada para resumo',
        description: 'Venda local.',
        amount: 185.5,
        timeLabel: 'agora',
        status: 'ready',
        archived: false,
        linked: true,
        hasPreInvoice: true,
        sentToAccountant: true,
        tags: ['Balcão', 'Conferir'],
      }],
      connections: [
        { id: 'mock-sale-01->mock-payment-01', fromId: 'mock-sale-01', toId: 'mock-payment-01', status: 'reconciled' },
      ],
    });
    render(<YopoyCentralDashboard theme="light" />);

    const summary = screen.getByLabelText(/resumo local visível/i) as HTMLTextAreaElement;
    expect(summary.value).toMatch(/venda separada para resumo/i);
    expect(summary.value).toMatch(/tipo: venda interna/i);
    expect(summary.value).toMatch(/status: pronto/i);
    expect(summary.value).toMatch(/valor: R\$\s*185,50/i);
    expect(summary.value).toMatch(/tem pré-nota visual/i);
    expect(summary.value).toMatch(/vínculo visual conciliado/i);

    fireEvent.click(screen.getByRole('button', { name: /copiar resumo/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(summary.value));
    expect(screen.getByText(/resumo local copiado\. revise antes de compartilhar manualmente com o contador/i)).toBeTruthy();
  });

  it('mantém resumo visível e mostra fallback quando clipboard falha', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('clipboard bloqueado'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    writeSnapshotWithAccountantPackageMockAsPending({
      items: [{
        id: 'mock-expense-01',
        kind: 'expense',
        title: 'Despesa separada',
        description: 'Despesa local.',
        amount: 72.4,
        timeLabel: 'agora',
        status: 'review',
        archived: false,
        linked: false,
        hasPreInvoice: false,
        sentToAccountant: true,
        tags: ['Despesa'],
      }],
    });
    render(<YopoyCentralDashboard theme="light" />);

    fireEvent.click(screen.getByRole('button', { name: /copiar resumo/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/não foi possível copiar automaticamente\. o resumo está visível para seleção manual/i)).toBeTruthy();
    expect((screen.getByLabelText(/resumo local visível/i) as HTMLTextAreaElement).value).toMatch(/despesa separada/i);
  });

  it('limpa marcações do pacote sem apagar cards, conexões ou pré-notas', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    writeSnapshotWithAccountantPackageMockAsPending({
      items: [{
        id: 'mock-sale-01',
        kind: 'sale',
        title: 'Venda com pré-nota separada',
        description: 'Venda local.',
        amount: 185,
        timeLabel: 'agora',
        status: 'review',
        archived: false,
        linked: true,
        hasPreInvoice: true,
        sentToAccountant: true,
        tags: ['Venda manual'],
      }],
      connections: [
        { id: 'mock-sale-01->mock-payment-01', fromId: 'mock-sale-01', toId: 'mock-payment-01', status: 'visual' },
      ],
    });
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByTestId('accountant-package-item-mock-sale-01')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /limpar pacote local/i }));

    expect(screen.getByText(/pacote local limpo\. os cards continuam na mesa/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /venda com pré-nota separada/i })).toBeTruthy();
    expect(screen.getByText(/nenhum card separado para contador ainda/i)).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const sale = snapshot.items.find((item) => item.id === 'mock-sale-01');
      expect(sale?.sentToAccountant).toBe(false);
      expect(sale?.hasPreInvoice).toBe(true);
      expect(snapshot.connections).toEqual([
        { id: 'mock-sale-01->mock-payment-01', fromId: 'mock-sale-01', toId: 'mock-payment-01', status: 'visual' },
      ]);
      expect(snapshot.items.some((item) => item.id === 'mock-sale-01')).toBe(true);
    });
  });

  it('mantém card accountant-package no pacote visual ao limpar marcações locais', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [{
        id: 'mock-package-01',
        kind: 'accountant-package',
        title: 'Pacote visual defensivo',
        description: 'Agrupamento visual local.',
        timeLabel: 'agora',
        status: 'ready',
        archived: false,
        linked: false,
        hasPreInvoice: false,
        sentToAccountant: true,
        tags: ['Contador'],
      }],
      positions: {},
      connections: [],
      activeFilter: 'all',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));
    render(<YopoyCentralDashboard theme="light" />);

    fireEvent.click(screen.getByRole('button', { name: /limpar pacote local/i }));

    expect(screen.getByTestId('accountant-package-item-mock-package-01')).toBeTruthy();
    await waitFor(() => {
      const packageCard = readStoredSnapshot().items.find((item) => item.id === 'mock-package-01');
      expect(packageCard?.kind).toBe('accountant-package');
      expect(packageCard?.sentToAccountant).toBe(true);
    });
  });

  it('cria despesa, recebimento, captura, pendência e pré-nota interna com os tipos existentes', async () => {
    render(<YopoyCentralDashboard theme="light" />);

    createQuickCard({ type: 'expense', title: 'Despesa local com valor', amount: '72.40' });
    createQuickCard({ type: 'payment', title: 'Recebimento local' });
    createQuickCard({ type: 'capture', title: 'Captura anotação local' });
    createQuickCard({ type: 'pending', title: 'Pendência local' });
    openQuickRegistration();
    fireEvent.change(screen.getByLabelText(/^tipo$/i), { target: { value: 'pre-invoice' } });
    expect(screen.getByText(/pré-nota interna não tem valor fiscal/i)).toBeTruthy();
    fillQuickRegistration({ title: 'Pré-nota interna local' });
    fireEvent.click(screen.getByRole('button', { name: /criar card/i }));

    expect(screen.getByRole('heading', { name: /despesa local com valor/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /recebimento local/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /captura anotação local/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /pendência local/i })).toBeTruthy();
    expect(screen.getAllByRole('heading', { name: /pré-nota interna local/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/pré-nota visual/i).length).toBeGreaterThan(0);

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.items.find((item) => item.title === 'Despesa local com valor')?.kind).toBe('expense');
      expect(snapshot.items.find((item) => item.title === 'Despesa local com valor')?.amount).toBe(72.4);
      expect(snapshot.items.find((item) => item.title === 'Recebimento local')?.kind).toBe('payment');
      expect(snapshot.items.find((item) => item.title === 'Captura anotação local')?.kind).toBe('capture');
      expect(snapshot.items.find((item) => item.title === 'Pendência local')?.kind).toBe('pending');
      const preInvoice = snapshot.items.find((item) => item.title === 'Pré-nota interna local');
      expect(preInvoice?.kind).toBe('pre-invoice');
      expect(preInvoice?.hasPreInvoice).toBe(true);
      expect(preInvoice?.tags).toContain('Sem valor fiscal');
    });
  });

  it('move um card com Pointer Events e salva sua posição lógica mesmo com zoom', async () => {
    render(<YopoyCentralDashboard theme="light" />);
    fireEvent.click(screen.getByRole('button', { name: /diminuir zoom/i }));
    fireEvent.click(screen.getByRole('button', { name: /diminuir zoom/i }));
    const card = getCaptureCard();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    const initialLeft = node.style.left;
    const initialTop = node.style.top;

    fireEvent.pointerDown(card, { pointerId: 7, button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(card, { pointerId: 7, clientX: 200, clientY: 200 });
    fireEvent.pointerUp(card, { pointerId: 7, clientX: 200, clientY: 200 });

    expect(node.style.left).not.toBe(initialLeft);
    expect(node.style.top).not.toBe(initialTop);
    expect(node.style.left).toBe('1024px');
    expect(node.style.top).toBe('244px');
    expect(screen.getByText(/posição do card salva neste navegador/i)).toBeTruthy();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.positions['mock-capture-01'].x).toBe(Number.parseFloat(node.style.left));
      expect(snapshot.positions['mock-capture-01'].y).toBe(Number.parseFloat(node.style.top));
    });

    const detailsButton = within(card).getByRole('button', { name: /abrir detalhes/i });
    const leftAfterDrag = node.style.left;
    const topAfterDrag = node.style.top;
    fireEvent.pointerDown(detailsButton, { pointerId: 8, button: 0, clientX: 1030, clientY: 280 });
    fireEvent.pointerMove(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    fireEvent.pointerUp(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    expect(node.style.left).toBe(leftAfterDrag);
    expect(node.style.top).toBe(topAfterDrag);
  });

  it('conecta dois cards pelos conectores com zoom, desenha uma linha SVG e salva a conexão', async () => {
    render(<YopoyCentralDashboard theme="dark" />);
    fireEvent.click(screen.getByRole('button', { name: /aumentar zoom/i }));
    const source = screen.getByRole('button', { name: /iniciar conexão de foto de comprovante/i });
    const target = screen.getByRole('button', { name: /conectar em comprovante pix/i });
    expect(source.className).toContain('h-11');
    expect(target.className).toContain('h-11');

    fireEvent.pointerDown(source, { pointerId: 9, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerMove(screen.getByTestId('task-canvas'), { pointerId: 9, clientX: 430, clientY: 700 });
    expect(screen.getByTestId('connection-preview')).toBeTruthy();
    expect(screen.getByTestId('connection-preview').getAttribute('x2')).toBe('344');
    fireEvent.pointerUp(target, { pointerId: 9, clientX: 434, clientY: 682 });

    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();
    expect(screen.getByText(/conexão visual criada e salva neste navegador/i)).toBeTruthy();
    expect(screen.getByText(/1 conexões/i)).toBeTruthy();
    await waitFor(() => {
      expect(readStoredSnapshot().connections).toEqual([
        { id: 'mock-capture-01->mock-payment-01', fromId: 'mock-capture-01', toId: 'mock-payment-01', status: 'visual' },
      ]);
    });

    fireEvent.pointerDown(source, { pointerId: 10, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerUp(target, { pointerId: 10, clientX: 434, clientY: 682 });
    expect(document.querySelectorAll('[data-connection-id="mock-capture-01->mock-payment-01"]')).toHaveLength(1);
    expect(screen.getByText(/essa conexão já existe/i)).toBeTruthy();

    const path = document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]');
    const initialPath = path?.getAttribute('d');
    const sourceCard = getCaptureCard();
    fireEvent.pointerDown(sourceCard, { pointerId: 11, button: 0, clientX: 850, clientY: 100 });
    fireEvent.pointerMove(sourceCard, { pointerId: 11, clientX: 930, clientY: 180 });
    fireEvent.pointerUp(sourceCard, { pointerId: 11, clientX: 930, clientY: 180 });
    expect(path?.getAttribute('d')).not.toBe(initialPath);

    fireEvent.click(screen.getByRole('button', { name: /limpar conexões/i }));
    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeNull();
    expect(screen.getByText(/todas as conexões visuais foram removidas e os vínculos dos cards foram recalculados/i)).toBeTruthy();
    await waitFor(() => expect(readStoredSnapshot().connections).toHaveLength(0));
  });

  it('mostra título, tipo, valor, status e vínculos no painel contextual do card selecionado', () => {
    render(<YopoyCentralDashboard theme="light" />);

    connectCaptureToPayment();
    selectCard(getCaptureCard());

    const panel = screen.getByLabelText(/painel contextual do card/i);
    expect(within(panel).getByRole('heading', { name: /foto de comprovante pix/i })).toBeTruthy();
    expect(within(panel).getByText(/^captura$/i)).toBeTruthy();
    expect(within(panel).getByText(/^novo$/i)).toBeTruthy();
    expect(within(panel).getAllByText(/R\$\s*45,00/i).length).toBeGreaterThan(0);
    expect(within(panel).getByText(/imagem registrada rapidamente/i)).toBeTruthy();
    expect(within(panel).getByText(/vínculos relacionados/i)).toBeTruthy();
    expect(within(panel).getByText(/comprovante pix.*visual/i)).toBeTruthy();
  });

  it('remove conexão visual quando um card conectado é movido para outra pasta', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1771771777000);
    vi.spyOn(Math, 'random').mockReturnValue(0.789123);
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Conferência');
    connectCaptureToPayment();
    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();

    selectCard(getCaptureCard());
    fireEvent.click(screen.getByRole('button', { name: /^mover para pasta$/i }));

    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeNull();
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.connections).toHaveLength(0);
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.parentFolderId).toMatch(/^folder-/);
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.linked).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-payment-01')?.linked).toBe(false);
    });
  });

  it('lista vínculo visual, marca como conciliado, persiste e restaura o estado conciliado', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<YopoyCentralDashboard theme="light" />);

    connectCaptureToPayment();

    const summary = screen.getByTestId('connection-summary-mock-capture-01->mock-payment-01');
    const visualLinksDetails = document.querySelector('details[aria-label="Vínculos visuais"]') as HTMLDetailsElement | null;
    expect(visualLinksDetails?.open).toBe(false);
    fireEvent.click(screen.getByRole('heading', { name: /vínculos visuais/i }));
    expect(visualLinksDetails?.open).toBe(true);
    fireEvent.click(screen.getByRole('heading', { name: /vínculos visuais/i }));
    expect(visualLinksDetails?.open).toBe(false);
    expect(screen.getByRole('heading', { name: /vínculos visuais/i })).toBeTruthy();
    expect(within(summary).getByText(/foto de comprovante/i)).toBeTruthy();
    expect(within(summary).getByText(/comprovante pix/i)).toBeTruthy();
    expect(within(summary).getAllByText(/^visual$/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/conciliação visual local/i)).toBeTruthy();
    expect(screen.getByText(/não altera financeiro real/i)).toBeTruthy();
    expect(screen.getByText(/não envia dados/i)).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();

    fireEvent.click(within(summary).getByRole('button', { name: /marcar conciliado/i }));

    expect(screen.getByText(/vínculo conciliado visualmente e salvo neste navegador/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/vínculo visual/i)).toBeTruthy();
    expect(within(getPaymentCard()).getByText(/vínculo visual/i)).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const connection = snapshot.connections[0];
      expect(connection.status).toBe('reconciled');
      expect(typeof connection.reconciledAt).toBe('string');
      expect(Number.isNaN(Date.parse(connection.reconciledAt ?? ''))).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.linked).toBe(true);
      expect(snapshot.items.find((item) => item.id === 'mock-payment-01')?.linked).toBe(true);
      expect(JSON.stringify(snapshot)).not.toMatch(/sefaz|xml|danfe|protocolo|nf-e|nfc-e|nfs-e/i);
    });

    cleanup();
    render(<YopoyCentralDashboard theme="light" />);

    const restoredSummary = screen.getByTestId('connection-summary-mock-capture-01->mock-payment-01');
    expect(within(restoredSummary).getAllByText(/^conciliado$/i).length).toBeGreaterThan(0);
    expect(within(getCaptureCard()).getByText(/vínculo visual/i)).toBeTruthy();
    expect(within(getPaymentCard()).getByText(/vínculo visual/i)).toBeTruthy();
  });

  it('mantém registro rápido, conexão e conciliação funcionando juntos sem chamar fetch', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.spyOn(Date, 'now').mockReturnValue(1771771772000);
    vi.spyOn(Math, 'random').mockReturnValue(0.234567);
    render(<YopoyCentralDashboard theme="light" />);

    createQuickCard({ type: 'sale', title: 'Venda interna para conciliar', amount: '48,90' });

    const source = screen.getByRole('button', { name: /iniciar conexão de venda interna para conciliar/i });
    const target = screen.getByRole('button', { name: /conectar em comprovante pix/i });
    fireEvent.pointerDown(source, { pointerId: 14, button: 0, clientX: 120, clientY: 120 });
    fireEvent.pointerUp(target, { pointerId: 14, clientX: 434, clientY: 682 });
    fireEvent.click(screen.getByRole('button', { name: /marcar conciliado/i }));

    expect(fetchSpy).not.toHaveBeenCalled();
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const created = snapshot.items.find((item) => item.id === 'local-1771771772000-8fzyhi');
      const connection = snapshot.connections.find((item) => item.id === 'local-1771771772000-8fzyhi->mock-payment-01');
      expect(created?.linked).toBe(true);
      expect(connection?.status).toBe('reconciled');
      expect(typeof connection?.reconciledAt).toBe('string');
    });
  });

  it('desfaz conciliação e recalcula linked dos cards envolvidos', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [
        { id: 'mock-capture-01', linked: true },
        { id: 'mock-payment-01', linked: true },
      ],
      positions: {},
      connections: [
        {
          id: 'mock-capture-01->mock-payment-01',
          fromId: 'mock-capture-01',
          toId: 'mock-payment-01',
          status: 'reconciled',
          reconciledAt: '2026-06-25T12:00:00.000Z',
        },
      ],
      activeFilter: 'all',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));
    render(<YopoyCentralDashboard theme="light" />);

    fireEvent.click(screen.getByRole('button', { name: /desfazer conciliação/i }));

    expect(screen.getByText(/conciliação visual desfeita/i)).toBeTruthy();
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.connections[0]).toEqual({
        id: 'mock-capture-01->mock-payment-01',
        fromId: 'mock-capture-01',
        toId: 'mock-payment-01',
        status: 'visual',
      });
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.linked).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-payment-01')?.linked).toBe(false);
    });
  });

  it('remove e limpa vínculos conciliados recalculando linked sem deixar marca órfã', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [
        { id: 'mock-capture-01', linked: true },
        { id: 'mock-sale-01', linked: true },
        { id: 'mock-payment-01', linked: true },
      ],
      positions: {},
      connections: [
        {
          id: 'mock-capture-01->mock-payment-01',
          fromId: 'mock-capture-01',
          toId: 'mock-payment-01',
          status: 'reconciled',
          reconciledAt: '2026-06-25T12:00:00.000Z',
        },
        {
          id: 'mock-sale-01->mock-payment-01',
          fromId: 'mock-sale-01',
          toId: 'mock-payment-01',
          status: 'reconciled',
          reconciledAt: '2026-06-25T12:05:00.000Z',
        },
      ],
      activeFilter: 'all',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));
    render(<YopoyCentralDashboard theme="light" />);

    fireEvent.click(within(screen.getByTestId('connection-summary-mock-capture-01->mock-payment-01')).getByRole('button', { name: /remover vínculo/i }));

    expect(screen.getByText(/vínculo removido e marcações visuais recalculadas/i)).toBeTruthy();
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.connections.map((connection) => connection.id)).toEqual(['mock-sale-01->mock-payment-01']);
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.linked).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-sale-01')?.linked).toBe(true);
      expect(snapshot.items.find((item) => item.id === 'mock-payment-01')?.linked).toBe(true);
    });

    fireEvent.click(screen.getByRole('button', { name: /limpar conexões/i }));

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.connections).toHaveLength(0);
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.linked).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-sale-01')?.linked).toBe(false);
      expect(snapshot.items.find((item) => item.id === 'mock-payment-01')?.linked).toBe(false);
    });
  });

  it('conclui conexão por coordenadas quando o toque fica capturado na origem', () => {
    render(<YopoyCentralDashboard theme="light" />);
    const source = screen.getByRole('button', { name: /iniciar conexão de foto de comprovante/i });
    const target = screen.getByRole('button', { name: /conectar em comprovante pix/i });
    Object.defineProperty(document, 'elementFromPoint', { configurable: true, value: vi.fn(() => target) });

    fireEvent.pointerDown(source, { pointerId: 12, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerUp(source, { pointerId: 12, clientX: 434, clientY: 682 });

    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();
  });

  it('leva o viewport ao primeiro card do filtro com zoom sem alterar sua posição', () => {
    render(<YopoyCentralDashboard theme="light" />);
    fireEvent.click(screen.getByRole('button', { name: /diminuir zoom/i }));
    const viewport = screen.getByTestId('task-canvas-viewport');
    const scrollTo = vi.fn();
    Object.defineProperty(viewport, 'scrollTo', { configurable: true, value: scrollTo });
    const node = screen.getByTestId('canvas-node-mock-archived-01');
    const initialPosition = `${node.style.left}:${node.style.top}`;

    fireEvent.click(screen.getByRole('button', { name: /arquivados/i }));

    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ left: 898.5, top: 876 }));
    expect(`${node.style.left}:${node.style.top}`).toBe(initialPosition);
  });

  it('salva estado do card e filtro ativo no localStorage', async () => {
    render(<YopoyCentralDashboard theme="light" />);
    fireEvent.click(screen.getByRole('button', { name: /aumentar zoom/i }));
    selectCard(getCaptureCard());
    fireEvent.click(screen.getByRole('button', { name: /avançar para pendente/i }));

    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.status).toBe('pending');
    });

    fireEvent.click(screen.getByRole('button', { name: /resolver \/ pronto/i }));
    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.status).toBe('resolved');
    });

    fireEvent.click(screen.getByRole('button', { name: /^arquivar$/i }));
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const savedCard = snapshot.items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.archived).toBe(true);
      expect(JSON.stringify(snapshot)).not.toMatch(/selectedCardId/i);
      expect(JSON.stringify(snapshot)).not.toMatch(/canvasZoom|zoom/i);
    });

    fireEvent.click(screen.getByRole('button', { name: /arquivados/i }));
    await waitFor(() => expect(readStoredSnapshot().activeFilter).toBe('archived'));

    cleanup();
    render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByText(/nenhum card selecionado/i)).toBeTruthy();
  });

  it('restaura snapshot salvo ao renderizar novamente', () => {
    const storedSnapshot: StoredTaskCanvasSnapshot = {
      version: 1,
      items: [{
        id: 'mock-capture-01',
        kind: 'capture',
        title: 'Foto de comprovante salva',
        description: 'Estado salvo no navegador.',
        amount: 48.9,
        timeLabel: 'agora',
        status: 'ready',
        archived: false,
        linked: true,
        hasPreInvoice: true,
        sentToAccountant: true,
        tags: ['Salvo'],
      }],
      positions: { 'mock-capture-01': { x: 612, y: 344 } },
      connections: [],
      activeFilter: 'ready',
      updatedAt: '2026-06-25T12:00:00.000Z',
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedSnapshot));

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getAllByRole('heading', { name: /foto de comprovante salva/i }).length).toBeGreaterThan(0);
    const savedCard = within(screen.getByTestId('canvas-node-mock-capture-01')).getByRole('heading', { name: /foto de comprovante salva/i }).closest('article') as HTMLElement;
    expect(within(savedCard).getByText(/^pronto$/i)).toBeTruthy();
    expect(within(savedCard).getByText(/vínculo visual/i)).toBeTruthy();
    expect(within(savedCard).getByText(/pré-nota visual/i)).toBeTruthy();
    expect(within(savedCard).getByText(/separado para contador/i)).toBeTruthy();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    expect(node.style.left).toBe('612px');
    expect(node.style.top).toBe('344px');
    expect(screen.getByRole('button', { name: /prontos/i }).getAttribute('aria-pressed')).toBe('true');
  });

  it('ignora snapshot inválido e versão incompatível sem quebrar a tela', () => {
    window.localStorage.setItem(STORAGE_KEY, '{json inválido');
    const firstRender = render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();

    firstRender.unmount();
    cleanup();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, items: [] }));
    render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
  });

  it('normaliza card incompleto e remove conexões com pontas inexistentes', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [{ id: 'mock-capture-01', status: 'ready', linked: true }],
      positions: { 'mock-capture-01': { x: 999, y: 888 } },
      connections: [
        { id: 'mock-capture-01->missing-card', fromId: 'mock-capture-01', toId: 'missing-card' },
      ],
      activeFilter: 'ready',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^pronto$/i)).toBeTruthy();
    expect(screen.getByText(/0 conexões/i)).toBeTruthy();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    expect(node.style.left).toBe('999px');
    expect(node.style.top).toBe('888px');
  });

  it('trata snapshot antigo sem status de conexão como vínculo visual', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [
        { id: 'mock-capture-01', linked: false },
        { id: 'mock-payment-01', linked: false },
      ],
      positions: {},
      connections: [
        { id: 'mock-capture-01->mock-payment-01', fromId: 'mock-capture-01', toId: 'mock-payment-01' },
      ],
      activeFilter: 'all',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));

    render(<YopoyCentralDashboard theme="light" />);

    const summary = screen.getByTestId('connection-summary-mock-capture-01->mock-payment-01');
    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();
    expect(within(summary).getAllByText(/^visual$/i).length).toBeGreaterThan(0);
    expect(within(summary).getByRole('button', { name: /marcar conciliado/i })).toBeTruthy();
    expect(within(getCaptureCard()).queryByText(/vínculo visual/i)).toBeNull();
    expect(within(getPaymentCard()).queryByText(/vínculo visual/i)).toBeNull();
  });

  it('restaura demonstração, limpa só a chave da Mesa e volta aos mocks', async () => {
    window.localStorage.setItem('yopoy:outra-chave', 'preservar');
    render(<YopoyCentralDashboard theme="light" />);
    createQuickCard({ type: 'capture', title: 'Card local para remover' });
    selectCard(getCaptureCard());
    fireEvent.click(screen.getByRole('button', { name: /avançar para pendente/i }));
    await waitFor(() => expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull());
    expect(screen.getAllByRole('heading', { name: /card local para remover/i }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /restaurar demonstração/i }));

    expect(screen.getByText(/demonstração restaurada\. os dados locais da mesa foram limpos/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /card local para remover/i })).toBeNull();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('yopoy:outra-chave')).toBe('preservar');
  });

  it('não usa backend nem emite fiscal real ao preparar pré-nota visual', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<YopoyCentralDashboard theme="light" />);
    const saleCard = screen.getByRole('heading', { name: /comanda mesa 1/i }).closest('article') as HTMLElement;

    selectCard(saleCard);
    fireEvent.click(screen.getByRole('button', { name: /preparar pré-nota/i }));

    expect(screen.getByText(/pré-nota visual adicionada sem valor fiscal/i)).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();
    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-sale-01');
      expect(savedCard?.hasPreInvoice).toBe(true);
      expect(savedCard?.status).toBe('review');
    });
  });
});
