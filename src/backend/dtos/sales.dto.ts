export interface CreateSaleRequest {
  customerId?: string;
}

export interface AddSaleItemRequest {
  productId?: string;
  serviceId?: string;
  qty: number;
  unitValue: number;
}

export interface SaleResponse {
  id: string;
  companyId: string;
  customerId?: string;
  totalAmount: number;
  discountAmount: number;
  items: SaleItemResponse[];
  status: string;
  createdAt: string;
}

export interface SaleItemResponse {
  id: string;
  productId?: string;
  serviceId?: string;
  qty: number;
  unitValue: number;
  totalValue: number;
}
