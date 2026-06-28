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

function openCanvasContextMenu(clientX = 180, clientY = 160) {
  fireEvent.contextMenu(screen.getByTestId('task-canvas'), { clientX, clientY });
}

function createFolder(name: string, clientX = 180, clientY = 160) {
  openCanvasContextMenu(clientX, clientY);
  fireEvent.click(screen.getByRole('menuitem', { name: /criar pasta aqui/i }));
  if (name === 'Nova pasta') return;
  fireEvent.click(screen.getByRole('button', { name: /^renomear pasta$/i }));
  fireEvent.change(screen.getByLabelText(/^nome da pasta$/i), { target: { value: name } });
  fireEvent.click(screen.getByRole('button', { name: /salvar nome da pasta/i }));
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

function openCardContextMenu(card: HTMLElement, clientX = 420, clientY = 180) {
  fireEvent.contextMenu(card, { clientX, clientY });
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
    expect(screen.getByText(/clique com o botão direito na mesa/i)).toBeTruthy();
    expect(screen.getByTestId('task-canvas')).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/captura \/ anotação/i)).toBeTruthy();
    expect(within(getCaptureCard()).queryByText(/ações alternativas/i)).toBeNull();
    expect(screen.getByText(/nenhum card selecionado/i)).toBeTruthy();
    expect(screen.getByText(/demonstração salva localmente/i)).toBeTruthy();
    expect(screen.getAllByText(/salvas neste navegador/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sem sincronização externa/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/pré-notas são visuais, sem valor fiscal/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /registro rápido/i })).toBeTruthy();
    expect(screen.getByText(/clique com o botão direito na mesa/i)).toBeTruthy();
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

  it('abre menu contextual da Mesa, cria pasta na posição clicada e controla zoom', async () => {
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

    expect(screen.queryByText(/zoom da mesa/i)).toBeNull();
    expect(screen.queryByLabelText(/^criar pasta$/i)).toBeNull();
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(1)');

    openCanvasContextMenu(260, 220);
    expect(screen.getByRole('menu', { name: /menu contextual da mesa/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /criar pasta aqui/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /restaurar demonstração/i })).toBeTruthy();
    expect(screen.getByText(/zoom atual: 100%/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('menuitem', { name: /diminuir zoom/i }));
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(0.75)');

    openCanvasContextMenu(260, 220);
    fireEvent.click(screen.getByRole('menuitem', { name: /zoom 100%/i }));
    openCanvasContextMenu(260, 220);
    fireEvent.click(screen.getByRole('menuitem', { name: /aumentar zoom/i }));
    expect(screen.getByTestId('task-canvas').style.transform).toBe('scale(1.25)');

    openCanvasContextMenu(260, 220);
    fireEvent.click(screen.getByRole('menuitem', { name: /ajustar visão/i }));
    expect(screen.getByText(/visão ajustada ao conteúdo visível da mesa/i)).toBeTruthy();
    expect(scrollTo).toHaveBeenCalled();

    openCanvasContextMenu(300, 260);
    fireEvent.click(screen.getByRole('menuitem', { name: /criar pasta aqui/i }));
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const folder = snapshot.items.find((item) => item.kind === 'folder' && item.title === 'Nova pasta');
      expect(folder?.parentFolderId).toBeNull();
      expect(snapshot.positions[folder?.id ?? '']).toEqual({ x: 600, y: 520 });
    });
  });

  it('mantém topo limpo e diferencia visualmente tipos operacionais', () => {
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.queryByLabelText(/^criar pasta$/i)).toBeNull();
    expect(screen.queryByText(/zoom da mesa/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /restaurar demonstração/i })).toBeNull();
    expect(screen.getByRole('button', { name: /registro rápido/i })).toBeTruthy();
    expect(screen.getByText(/filtros da mesa/i)).toBeTruthy();

    expect(within(screen.getByTestId('canvas-node-mock-sale-01')).getByText(/comanda \/ venda/i)).toBeTruthy();
    expect(within(screen.getByTestId('canvas-node-mock-payment-01')).getByText(/pagamento \/ comprovante/i)).toBeTruthy();
    expect(within(screen.getByTestId('canvas-node-mock-expense-01')).getAllByText(/^despesa$/i).length).toBeGreaterThan(0);
    expect(within(screen.getByTestId('canvas-node-mock-pre-invoice-01')).getAllByText(/pré-nota visual/i).length).toBeGreaterThan(0);
    expect(within(screen.getByTestId('canvas-node-mock-pre-invoice-01')).getAllByText(/sem valor fiscal/i).length).toBeGreaterThan(0);
    expect(within(screen.getByTestId('canvas-node-mock-capture-01')).getByText(/captura \/ anotação/i)).toBeTruthy();
  });

  it('abre menu contextual de card e de pasta com ações úteis', () => {
    render(<YopoyCentralDashboard theme="light" />);

    openCardContextMenu(screen.getByRole('heading', { name: /comanda mesa 1/i }).closest('article') as HTMLElement);
    expect(screen.getByRole('menu', { name: /menu contextual do card/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /selecionar card/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /preparar pré-nota visual/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /separar para contador/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /^arquivar$/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('menuitem', { name: /abrir painel do card/i }));
    expect(screen.getByText(/painel do card aberto/i)).toBeTruthy();

    createFolder('Menu Pasta', 260, 220);
    fireEvent.contextMenu(getFolderCard(/^menu pasta$/i), { clientX: 300, clientY: 240 });
    expect(screen.getByRole('menu', { name: /menu contextual da pasta/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /abrir pasta/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /renomear pasta/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /arquivar pasta/i })).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /ver painel da pasta/i })).toBeTruthy();
  });

  it('permite seleção múltipla local e limpar seleção sem persistir', async () => {
    render(<YopoyCentralDashboard theme="light" />);

    selectCard(getCaptureCard());
    fireEvent.contextMenu(getPaymentCard(), { clientX: 540, clientY: 220 });
    fireEvent.click(screen.getByRole('menuitem', { name: /adicionar à seleção/i }));

    expect(screen.getByText(/2 item\(ns\) selecionado\(s\)/i)).toBeTruthy();
    fireEvent.contextMenu(getPaymentCard(), { clientX: 540, clientY: 220 });
    fireEvent.click(screen.getByRole('menuitem', { name: /remover da seleção/i }));
    expect(screen.getByText(/1 item\(ns\) selecionado\(s\)/i)).toBeTruthy();

    fireEvent.click(screen.getAllByRole('button', { name: /limpar seleção/i })[0]);
    expect(screen.getByText(/nenhum card selecionado/i)).toBeTruthy();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('exclui card comum e pré-nota pelo menu contextual', async () => {
    render(<YopoyCentralDashboard theme="light" />);

    openCardContextMenu(getCaptureCard());
    expect(screen.getByRole('menuitem', { name: /excluir card/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('menuitem', { name: /excluir card/i }));
    expect(screen.getByText(/clique novamente para confirmar a exclusão do card/i)).toBeTruthy();
    openCardContextMenu(getCaptureCard());
    fireEvent.click(screen.getByRole('menuitem', { name: /confirmar exclusão/i }));
    expect(screen.queryByRole('heading', { name: /foto de comprovante pix/i })).toBeNull();

    openQuickRegistration();
    fireEvent.change(screen.getByLabelText(/^tipo$/i), { target: { value: 'pre-invoice' } });
    fillQuickRegistration({ title: 'Pré-nota local', description: 'Documento interno', amount: '35,00' });
    fireEvent.click(screen.getByRole('button', { name: /criar card/i }));

    const preInvoiceCard = screen.getAllByRole('heading', { name: /pré-nota local/i })
      .map((heading) => heading.closest('article') as HTMLElement | null)
      .find((article) => article?.dataset.cardId?.startsWith('local-')) as HTMLElement;
    openCardContextMenu(preInvoiceCard);
    fireEvent.click(screen.getByRole('menuitem', { name: /excluir pré-nota/i }));
    openCardContextMenu(preInvoiceCard);
    fireEvent.click(screen.getByRole('menuitem', { name: /confirmar exclusão/i }));
    expect(screen.queryByRole('heading', { name: /pré-nota local/i })).toBeNull();
  });

  it('bloqueia exclusão de pasta com itens e permite excluir pasta vazia', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1771771778000);
    vi.spyOn(Math, 'random').mockReturnValue(0.891234);
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Arquivos');
    const folderCard = getFolderCard(/^arquivos$/i);
    expect(within(folderCard).getByText(/0 item\(ns\) e 0 subpasta\(s\)/i)).toBeTruthy();

    selectCard(screen.getByRole('heading', { name: /foto de comprovante pix/i }).closest('article') as HTMLElement);
    fireEvent.click(screen.getByRole('button', { name: /mover para pasta/i }));

    selectCard(getFolderCard(/^arquivos$/i));
    openCardContextMenu(getFolderCard(/^arquivos$/i));
    fireEvent.click(screen.getByRole('menuitem', { name: /excluir pasta/i }));
    expect(screen.getByText(/clique novamente para confirmar a exclusão da pasta/i)).toBeTruthy();
    openCardContextMenu(getFolderCard(/^arquivos$/i));
    fireEvent.click(screen.getByRole('menuitem', { name: /confirmar exclusão da pasta/i }));
    expect(screen.getByText(/esvazie a pasta antes de excluir/i)).toBeTruthy();
    expect(screen.getAllByRole('heading', { name: /^arquivos$/i }).length).toBeGreaterThan(0);

    vi.spyOn(Date, 'now').mockReturnValue(1771771779000);
    vi.spyOn(Math, 'random').mockReturnValue(0.912345);
    createFolder('Arquivo vazio', 300, 240);
    const emptyFolder = getFolderCard(/^arquivo vazio$/i);
    openCardContextMenu(emptyFolder);
    fireEvent.click(screen.getByRole('menuitem', { name: /excluir pasta/i }));
    openCardContextMenu(emptyFolder);
    fireEvent.click(screen.getByRole('menuitem', { name: /confirmar exclusão da pasta/i }));
    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.items.some((item) => item.title === 'Arquivo vazio')).toBe(false);
    });
  });

  it('permite pan da Mesa pela área vazia sem interferir no drag de card', () => {
    render(<YopoyCentralDashboard theme="light" />);
    const viewport = screen.getByTestId('task-canvas-viewport');
    Object.defineProperty(viewport, 'scrollLeft', { configurable: true, writable: true, value: 200 });
    Object.defineProperty(viewport, 'scrollTop', { configurable: true, writable: true, value: 120 });
    const canvas = screen.getByTestId('task-canvas');

    fireEvent.pointerDown(canvas, { pointerId: 42, button: 0, clientX: 300, clientY: 200 });
    fireEvent.pointerMove(canvas, { pointerId: 42, clientX: 240, clientY: 150 });
    expect(viewport.scrollLeft).toBe(260);
    expect(viewport.scrollTop).toBe(170);
    fireEvent.pointerUp(canvas, { pointerId: 42, clientX: 240, clientY: 150 });

    const captureCard = getCaptureCard();
    const initialLeft = screen.getByTestId('canvas-node-mock-capture-01').style.left;
    fireEvent.pointerDown(captureCard, { pointerId: 43, button: 0, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(captureCard, { pointerId: 43, clientX: 180, clientY: 140 });
    fireEvent.pointerUp(captureCard, { pointerId: 43, clientX: 180, clientY: 140 });
    expect(screen.getByTestId('canvas-node-mock-capture-01').style.left).not.toBe(initialLeft);
  });

  it('cria pré-nota visual da seleção, ignora pastas e abre preview imprimível', async () => {
    const printSpy = vi.fn();
    Object.defineProperty(window, 'print', { configurable: true, value: printSpy });
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Anexo');
    selectCard(getCaptureCard());
    fireEvent.contextMenu(getPaymentCard(), { clientX: 540, clientY: 220 });
    fireEvent.click(screen.getByRole('menuitem', { name: /adicionar à seleção/i }));
    fireEvent.pointerDown(getFolderCard(/^anexo$/i), {
      pointerId: 74,
      button: 0,
      clientX: 320,
      clientY: 220,
      ctrlKey: true,
    });
    fireEvent.pointerUp(getFolderCard(/^anexo$/i), {
      pointerId: 74,
      clientX: 320,
      clientY: 220,
      ctrlKey: true,
    });

    expect(screen.getByText(/3 item\(ns\) selecionado\(s\)/i)).toBeTruthy();
    expect(screen.getByText(/pastas não entram na pré-nota/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /criar pré-nota visual/i }));

    const dialog = screen.getByRole('dialog', { name: /pré-nota visual interna/i });
    expect(within(dialog).getAllByText(/sem valor fiscal/i).length).toBeGreaterThan(0);
    expect(within(dialog).getByText(/não é nf-e, nfc-e ou nfs-e/i)).toBeTruthy();
    expect(within(dialog).getByText(/yopoy/i)).toBeTruthy();
    expect(within(dialog).getByText(/cabeçalho/i)).toBeTruthy();
    expect(within(dialog).getByText(/emitente/i)).toBeTruthy();
    expect(within(dialog).getByText(/destinatário/i)).toBeTruthy();
    expect(within(dialog).getByText(/^Itens$/i)).toBeTruthy();
    expect(within(dialog).getByText(/^Totais$/i)).toBeTruthy();
    expect(within(dialog).getByText(/^Observações$/i)).toBeTruthy();
    expect(within(dialog).getByText(/pré-nota visual — 2 itens/i)).toBeTruthy();
    expect(within(dialog).getByText(/^2 item\(ns\)$/i)).toBeTruthy();
    expect(within(dialog).getByText(/salvar como pdf do navegador/i)).toBeTruthy();

    fireEvent.click(within(dialog).getByRole('button', { name: /imprimir \/ salvar pdf/i }));
    expect(printSpy).toHaveBeenCalled();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const created = snapshot.items.find((item) => item.kind === 'pre-invoice' && item.title.includes('2 itens'));
      expect(created?.sourceCardIds).toEqual(expect.arrayContaining(['mock-capture-01', 'mock-payment-01']));
      expect(created?.sourceCardIds).not.toContain(expect.stringMatching(/^folder-/));
      expect(created?.preInvoiceSummary?.itemCount).toBe(2);
      expect(created?.preInvoiceSummary?.sourceTitles).toEqual(expect.arrayContaining(['Foto de comprovante Pix — R$ 45,00', 'Comprovante Pix — R$ 45,00']));
      expect(snapshot.connections.some((connection) => connection.toId === created?.id)).toBe(true);
    });
  });

  it('cria pasta local, salva no snapshot e abre submesa vazia pelo painel', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1771771773000);
    vi.spyOn(Math, 'random').mockReturnValue(0.345678);
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.queryByLabelText(/^criar pasta$/i)).toBeNull();

    createFolder('Mesa 1');

    expect(screen.getByText(/pasta renomeada localmente nesta mesa/i)).toBeTruthy();
    const folderCard = getFolderCard(/^mesa 1$/i);
    expect(within(folderCard).getAllByText(/pasta \/ submesa/i).length).toBeGreaterThan(0);
    expect(within(folderCard).getByText(/0 item\(ns\) e 0 subpasta\(s\)/i)).toBeTruthy();
    expect(within(folderCard).queryByText(/R\$/i)).toBeNull();

    await waitFor(() => {
      const folder = readStoredSnapshot().items.find((item) => item.title === 'Mesa 1');
      expect(folder?.id.startsWith('folder-1771771773000-')).toBe(true);
      expect(folder?.kind).toBe('folder');
      expect(folder?.parentFolderId).toBeNull();
    });

    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));

    expect(screen.getByRole('heading', { name: /submesa: mesa 1/i })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: /caminho da mesa/i }).textContent).toMatch(/mesa principal.*mesa 1/i);
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
    expect(screen.getByText(/este item está em/i)).toBeTruthy();
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

  it('arrasta card comum para cima de uma pasta e salva parentFolderId', async () => {
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Pedidos', 180, 160);
    const folderCard = getFolderCard(/^pedidos$/i);
    const captureCard = getCaptureCard();

    fireEvent.pointerDown(captureCard, { pointerId: 31, button: 0, clientX: 850, clientY: 80 });
    fireEvent.pointerMove(captureCard, { pointerId: 31, clientX: 220, clientY: 200 });
    expect(within(folderCard).getByText(/soltar aqui/i)).toBeTruthy();
    fireEvent.pointerUp(captureCard, { pointerId: 31, clientX: 220, clientY: 200 });

    expect(screen.getByText(/card movido para a pasta local/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /foto de comprovante pix/i })).toBeNull();

    selectCard(folderCard);
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    expect(screen.getByRole('heading', { name: /foto de comprovante pix/i })).toBeTruthy();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const folder = snapshot.items.find((item) => item.kind === 'folder' && item.title === 'Pedidos');
      expect(snapshot.items.find((item) => item.id === 'mock-capture-01')?.parentFolderId).toBe(folder?.id);
    });
  });

  it('arrasta pasta para dentro de outra pasta, abre subpasta e mostra breadcrumb hierárquico', async () => {
    render(<YopoyCentralDashboard theme="light" />);

    createFolder('Pedidos', 180, 160);
    createFolder('Delivery', 560, 160);
    const pedidosCard = getFolderCard(/^pedidos$/i);
    const deliveryCard = getFolderCard(/^delivery$/i);

    fireEvent.pointerDown(pedidosCard, { pointerId: 32, button: 0, clientX: 190, clientY: 170 });
    fireEvent.pointerMove(pedidosCard, { pointerId: 32, clientX: 600, clientY: 200 });
    expect(within(deliveryCard).getByText(/soltar aqui/i)).toBeTruthy();
    fireEvent.pointerUp(pedidosCard, { pointerId: 32, clientX: 600, clientY: 200 });

    expect(screen.getByText(/pasta movida para dentro de outra pasta local/i)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /^pedidos$/i })).toBeNull();

    selectCard(deliveryCard);
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    expect(screen.getByRole('heading', { name: /^pedidos$/i })).toBeTruthy();
    expect(within(getFolderCard(/^pedidos$/i)).getByText(/pasta \/ submesa/i)).toBeTruthy();

    selectCard(getFolderCard(/^pedidos$/i));
    fireEvent.click(screen.getByRole('button', { name: /abrir pasta/i }));
    expect(screen.getByRole('heading', { name: /submesa: pedidos/i })).toBeTruthy();
    expect(screen.getByRole('navigation', { name: /caminho da mesa/i }).textContent).toMatch(/mesa principal.*delivery.*pedidos/i);
    fireEvent.click(screen.getByRole('button', { name: /voltar um nível/i }));
    expect(screen.getByRole('heading', { name: /submesa: delivery/i })).toBeTruthy();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      const pedidos = snapshot.items.find((item) => item.kind === 'folder' && item.title === 'Pedidos');
      const delivery = snapshot.items.find((item) => item.kind === 'folder' && item.title === 'Delivery');
      expect(pedidos?.parentFolderId).toBe(delivery?.id);
      expect(JSON.stringify(snapshot)).not.toMatch(/activeFolderId|selectedCardId|canvasZoom|contextMenu/i);
    });
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
    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /diminuir zoom/i }));
    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /diminuir zoom/i }));
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
    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /aumentar zoom/i }));
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
    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /diminuir zoom/i }));
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
    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /aumentar zoom/i }));
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

    openCanvasContextMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: /restaurar demonstração/i }));

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
