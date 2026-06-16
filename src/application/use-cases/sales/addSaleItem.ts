import { Sale, SaleItem } from '../../../domain/entities';
import { SaleRepository } from '../../repositories/SaleRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface AddSaleItemInput {
  companyId: string;
  userId: string;
  saleId: string;
  productId?: string;
  serviceId?: string;
  qty: number;
  unitValue: number;
}

export async function addSaleItem(
  input: AddSaleItemInput,
  saleRepo: SaleRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<Sale>> {
  if (!input.companyId) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'companyId is required'));
  }

  const sale = await saleRepo.findById(input.companyId, input.saleId);
  if (!sale) {
    return failure(new ApplicationError('NOT_FOUND', 'Sale not found'));
  }

  if (sale.status !== 'PENDING') {
    return failure(new ApplicationError('INVALID_STATUS_TRANSITION', 'Can only add items to PENDING sales'));
  }

  const item: SaleItem = {
    id: randomUUID(),
    sale_id: sale.id,
    product_id: input.productId,
    service_id: input.serviceId,
    qty: input.qty,
    unit_value: input.unitValue,
    total_value: input.qty * input.unitValue
  };

  const previousState = JSON.stringify(sale);

  await saleRepo.addSaleItem(input.companyId, sale.id, item);

  const updatedSale = await saleRepo.findById(input.companyId, input.saleId);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'Sale',
    entity_id: sale.id,
    action: 'UPDATE',
    previous_state: previousState,
    current_state: JSON.stringify(updatedSale),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(updatedSale!);
}
