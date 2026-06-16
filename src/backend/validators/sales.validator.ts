import { AddSaleItemRequest } from '../dtos/sales.dto';
import { ValidationResult } from '../shared';

export function validateAddSaleItemRequest(data: any): ValidationResult<AddSaleItemRequest> {
  const errors: Record<string, string> = {};

  if (!data) {
    return { success: false, errors: { body: 'Request body is required' } };
  }

  if (!data.productId && !data.serviceId) {
    errors.productId = 'Either productId or serviceId must be provided';
  }

  if (typeof data.qty !== 'number' || data.qty <= 0) {
    errors.qty = 'Quantity must be a positive number';
  }

  if (typeof data.unitValue !== 'number' || data.unitValue < 0) {
    errors.unitValue = 'Unit value must be a non-negative number';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      productId: data.productId,
      serviceId: data.serviceId,
      qty: data.qty,
      unitValue: data.unitValue,
    }
  };
}
