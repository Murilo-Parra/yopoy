export type SmartCardKind =
  | 'capture'
  | 'sale'
  | 'payment'
  | 'expense'
  | 'stock'
  | 'invoice-draft'
  | 'pre-invoice'
  | 'accountant-package'
  | 'pending'
  | 'ai-alert';

export const SMART_CARD_STATUS_FLOW = ['new', 'pending', 'review', 'ready', 'resolved'] as const;

export type SmartCardStatus = typeof SMART_CARD_STATUS_FLOW[number];

export interface CanvasCardPosition {
  x: number;
  y: number;
}

export interface CanvasCardConnection {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
}

export interface SmartCardItem {
  id: string;
  kind: SmartCardKind;
  title: string;
  description: string;
  amount?: number;
  timeLabel: string;
  status: SmartCardStatus;
  archived: boolean;
  linked: boolean;
  hasPreInvoice: boolean;
  sentToAccountant?: boolean;
  tags: string[];
}
