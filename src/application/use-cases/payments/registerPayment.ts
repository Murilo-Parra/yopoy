import { Payment } from '../../../domain/entities';
import { PaymentRepository } from '../../repositories/PaymentRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface RegisterPaymentInput {
  companyId: string;
  userId: string;
  amount: number;
  method: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'TRANSFER' | 'OTHER';
  saleId?: string;
}

export async function registerPayment(
  input: RegisterPaymentInput,
  paymentRepo: PaymentRepository,
  auditRepo: AuditLogRepository,
  pendingRepo: PendingItemRepository
): Promise<UseCaseResult<Payment>> {
  if (!input.companyId) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'companyId is required'));
  }

  if (input.amount <= 0) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'amount must be greater than zero'));
  }

  const payment: Payment = {
    id: randomUUID(),
    company_id: input.companyId,
    amount: input.amount,
    method: input.method,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId,
    version: 1
  };

  await paymentRepo.create(payment);

  if (!input.saleId) {
    await pendingRepo.create({
      id: randomUUID(),
      company_id: input.companyId,
      type: 'UNLINKED_PAYMENT',
      reference_id: payment.id,
      amount: input.amount,
      status: 'PENDING',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: input.userId
    });
  }

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'Payment',
    entity_id: payment.id,
    action: 'CREATE',
    current_state: JSON.stringify(payment),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(payment);
}
