export interface OpenCashSessionRequest {
  initialBalance: number;
}

export interface CloseCashSessionRequest {
  finalBalance: number;
}

export interface CashSessionResponse {
  id: string;
  openedAt: string;
  closedAt?: string;
  initialBalance: number;
  finalBalance?: number;
}
