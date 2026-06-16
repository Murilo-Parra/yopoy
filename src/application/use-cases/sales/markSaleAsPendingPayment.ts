import { SaleRepository } from '../../repositories/SaleRepository';
import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface MarkSaleAsPendingPaymentInput {
  companyId: string;
  userId: string;
  saleId: string;
}

export async function markSaleAsPendingPayment(
  input: MarkSaleAsPendingPaymentInput,
  saleRepo: SaleRepository,
  pendingRepo: PendingItemRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<void>> {
  const sale = await saleRepo.findById(input.companyId, input.saleId);

  if (!sale) {
    return failure(new ApplicationError('NOT_FOUND', 'Sale not found'));
  }

  if (sale.status !== 'PENDING') {
    return failure(new ApplicationError('INVALID_STATUS_TRANSITION', 'Sale must be PENDING to mark as unpaid pending'));
  }

  await pendingRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    type: 'UNPAID_SALE',
    reference_id: sale.id,
    amount: sale.total_amount,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  });

  return success(undefined);
}
