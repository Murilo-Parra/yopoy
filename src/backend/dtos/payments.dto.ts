export interface RegisterPaymentRequest {
  amount: number;
  method: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'TRANSFER' | 'OTHER';
  saleId?: string;
}

export interface LinkPaymentToSaleRequest {
  saleId: string;
}

export interface UnlinkPaymentFromSaleRequest {
  saleId: string;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}
