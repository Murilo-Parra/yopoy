import { Sale } from '../../domain/entities';
import { SaleResponse } from '../dtos/sales.dto';

export function mapSaleToResponse(sale: Sale): SaleResponse {
  return {
    id: sale.id,
    companyId: sale.company_id,
    customerId: sale.customer_id,
    totalAmount: sale.total_amount,
    discountAmount: sale.discount_amount,
    items: sale.items.map(item => ({
      id: item.id,
      productId: item.product_id,
      serviceId: item.service_id,
      qty: item.qty,
      unitValue: item.unit_value,
      totalValue: item.total_value,
    })),
    status: sale.status,
    createdAt: sale.created_at.toISOString(),
  };
}
