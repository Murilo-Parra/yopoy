import { Sale } from '../../../domain/entities';
import { SaleRepository } from '../../repositories/SaleRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreateSaleInput {
  companyId: string;
  userId: string;
  customerId?: string;
}

export async function createSale(
  input: CreateSaleInput,
  saleRepo: SaleRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<Sale>> {
  if (!input.companyId) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'companyId is required'));
  }

  const newSale: Sale = {
    id: randomUUID(),
    company_id: input.companyId,
    customer_id: input.customerId,
    total_amount: 0,
    discount_amount: 0,
    items: [],
    status: 'PENDING',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId,
    version: 1
  };

  await saleRepo.create(newSale);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'Sale',
    entity_id: newSale.id,
    action: 'CREATE',
    current_state: JSON.stringify(newSale),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(newSale);
}
