export interface CreateSmartCaptureDraftRequest {
  rawText: string;
  attachmentId?: string;
}

export interface ConvertSmartCaptureDraftToSaleRequest {
  totalAmount: number;
}

export interface SmartCaptureDraftResponse {
  id: string;
  rawText: string;
  attachmentId?: string;
  status: string;
  createdAt: string;
}
