import { RegisterPaymentRequest } from '../dtos/payments.dto';
import { ValidationResult } from '../shared';

export function validateRegisterPaymentRequest(data: any): ValidationResult<RegisterPaymentRequest> {
  const errors: Record<string, string> = {};

  if (!data) {
    return { success: false, errors: { body: 'Request body is required' } };
  }

  if (typeof data.amount !== 'number' || data.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  const validMethods = ['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'CASH', 'TRANSFER', 'OTHER'];
  if (!validMethods.includes(data.method)) {
    errors.method = `Method must be one of: ${validMethods.join(', ')}`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      amount: data.amount,
      method: data.method,
      saleId: data.saleId,
    }
  };
}
