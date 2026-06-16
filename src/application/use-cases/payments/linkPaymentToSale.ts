import { PaymentRepository } from '../../repositories/PaymentRepository';
import { SaleRepository } from '../../repositories/SaleRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { LedgerRepository } from '../../repositories/LedgerRepository';
import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface LinkPaymentToSaleInput {
  companyId: string;
  userId: string;
  paymentId: string;
  saleId: string;
}

export async function linkPaymentToSale(
  input: LinkPaymentToSaleInput,
  paymentRepo: PaymentRepository,
  saleRepo: SaleRepository,
  auditRepo: AuditLogRepository,
  ledgerRepo: LedgerRepository,
  pendingRepo: PendingItemRepository
): Promise<UseCaseResult<void>> {
  const payment = await paymentRepo.findById(input.companyId, input.paymentId);
  if (!payment) return failure(new ApplicationError('NOT_FOUND', 'Payment not found'));

  const sale = await saleRepo.findById(input.companyId, input.saleId);
  if (!sale) return failure(new ApplicationError('NOT_FOUND', 'Sale not found'));

  const existingLinks = await paymentRepo.getLinksBySale(input.companyId, input.saleId);
  const alreadyLinked = existingLinks.some(l => l.payment_id === payment.id);
  
  if (alreadyLinked) {
    return failure(new ApplicationError('ALREADY_LINKED', 'Payment already linked to this sale'));
  }

  const link = await paymentRepo.createLink({
    id: randomUUID(),
    payment_id: payment.id,
    sale_id: sale.id,
    assigned_amount: payment.amount,
    created_at: new Date(),
    created_by: input.userId
  });

  await ledgerRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    account: 'SALES_REVENUE',
    debit: payment.amount,
    credit: 0,
    reference_id: sale.id,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  });

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'PaymentLink',
    entity_id: link.id,
    action: 'LINK',
    current_state: JSON.stringify(link),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(undefined);
}
