export type EventType =
  | 'SaleCreated'
  | 'PaymentRegistered'
  | 'PaymentLinkedToSale'
  | 'PaymentUnlinkedFromSale'
  | 'CashSessionOpened'
  | 'CashSessionClosed'
  | 'ExpenseCreated'
  | 'SmartCaptureDraftReviewed'
  | 'DraftInvoiceCreated'
  | 'PendingItemResolved';

export interface DomainEvent {
  type: EventType;
  payload: any;
  occurred_at: Date;
}
