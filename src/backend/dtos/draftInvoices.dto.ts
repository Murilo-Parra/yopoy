export interface CreateDraftInvoiceFromSaleRequest {
  saleId: string;
}

export interface DraftInvoiceResponse {
  id: string;
  saleId: string;
  status: string;
  simulatedTaxes: Record<string, number>;
  createdAt: string;
}
