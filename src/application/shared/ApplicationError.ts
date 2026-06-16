export type ApplicationErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED_COMPANY_ACCESS'
  | 'INVALID_STATUS_TRANSITION'
  | 'ALREADY_LINKED'
  | 'NOT_LINKED'
  | 'CASH_SESSION_NOT_OPEN'
  | 'CASH_SESSION_ALREADY_OPEN'
  | 'SALE_ALREADY_CANCELLED'
  | 'PAYMENT_ALREADY_LINKED'
  | 'DRAFT_NOT_REVIEWED'
  | 'FISCAL_ACTION_BLOCKED';

export class ApplicationError extends Error {
  constructor(public readonly code: ApplicationErrorCode, message: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}
