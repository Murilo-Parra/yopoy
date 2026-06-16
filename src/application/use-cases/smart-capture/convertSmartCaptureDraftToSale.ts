import { Sale } from '../../../domain/entities';
import { SmartCaptureRepository } from '../../repositories/SmartCaptureRepository';
import { SaleRepository } from '../../repositories/SaleRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface ConvertSmartCaptureDraftToSaleInput {
  companyId: string;
  userId: string;
  draftId: string;
  totalAmount: number;
}

export async function convertSmartCaptureDraftToSale(
  input: ConvertSmartCaptureDraftToSaleInput,
  draftRepo: SmartCaptureRepository,
  saleRepo: SaleRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<Sale>> {
  const draft = await draftRepo.findById(input.companyId, input.draftId);

  if (!draft) {
    return failure(new ApplicationError('NOT_FOUND', 'Smart capture draft not found'));
  }

  if (draft.status !== 'ACTIVE') {
    return failure(new ApplicationError('DRAFT_NOT_REVIEWED', 'Draft must be reviewed before conversion'));
  }

  const previousDraftState = JSON.stringify(draft);

  draft.status = 'CLOSED';
  draft.updated_at = new Date();
  draft.updated_by = input.userId;
  draft.version += 1;

  await draftRepo.update(draft);

  const newSale: Sale = {
    id: randomUUID(),
    company_id: input.companyId,
    total_amount: input.totalAmount,
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
    entity_type: 'SmartCaptureDraft',
    entity_id: draft.id,
    action: 'UPDATE',
    previous_state: previousDraftState,
    current_state: JSON.stringify(draft),
    user_id: input.userId,
    created_at: new Date()
  });

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
