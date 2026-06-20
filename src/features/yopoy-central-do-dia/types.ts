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

export type SmartCardStatus = 'new' | 'pending' | 'review' | 'ready';

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
  tags: string[];
}
