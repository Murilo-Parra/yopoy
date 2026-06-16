import { DraftInvoice } from '../../../domain/entities';
import { DraftInvoiceRepository } from '../../repositories/DraftInvoiceRepository';
import { SaleRepository } from '../../repositories/SaleRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreateDraftInvoiceFromSaleInput {
  companyId: string;
  userId: string;
  saleId: string;
}

export async function createDraftInvoiceFromSale(
  input: CreateDraftInvoiceFromSaleInput,
  draftRepo: DraftInvoiceRepository,
  saleRepo: SaleRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<DraftInvoice>> {
  const sale = await saleRepo.findById(input.companyId, input.saleId);

  if (!sale) {
    return failure(new ApplicationError('NOT_FOUND', 'Sale not found'));
  }

  const draft: DraftInvoice = {
    id: randomUUID(),
    company_id: input.companyId,
    sale_id: sale.id,
    simulated_taxes: {},
    status: 'PENDING',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId,
    version: 1
  };

  await draftRepo.create(draft);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'DraftInvoice',
    entity_id: draft.id,
    action: 'CREATE',
    current_state: JSON.stringify(draft),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(draft);
}
