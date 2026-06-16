import { PaymentRepository } from '../../repositories/PaymentRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface UnlinkPaymentFromSaleInput {
  companyId: string;
  userId: string;
  paymentId: string;
  saleId: string;
}

export async function unlinkPaymentFromSale(
  input: UnlinkPaymentFromSaleInput,
  paymentRepo: PaymentRepository,
  auditRepo: AuditLogRepository,
  pendingRepo: PendingItemRepository
): Promise<UseCaseResult<void>> {
  const existingLinks = await paymentRepo.getLinksBySale(input.companyId, input.saleId);
  const link = existingLinks.find(l => l.payment_id === input.paymentId);

  if (!link) {
    return failure(new ApplicationError('NOT_LINKED', 'Payment is not linked to this sale'));
  }

  await paymentRepo.removeLink(link.id);

  await pendingRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    type: 'UNLINKED_PAYMENT',
    reference_id: input.paymentId,
    amount: link.assigned_amount,
    status: 'PENDING',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  });

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'PaymentLink',
    entity_id: link.id,
    action: 'UNLINK',
    previous_state: JSON.stringify(link),
    current_state: JSON.stringify({ ...link, removed: true }),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(undefined);
}
