import { Payment } from '../../domain/entities';
import { PaymentResponse } from '../dtos/payments.dto';

export function mapPaymentToResponse(payment: Payment): PaymentResponse {
  return {
    id: payment.id,
    amount: payment.amount,
    method: payment.method,
    status: payment.status,
    createdAt: payment.created_at.toISOString(),
  };
}
