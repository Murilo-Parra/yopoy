import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface ResolvePendingItemInput {
  companyId: string;
  userId: string;
  itemId: string;
}

export async function resolvePendingItem(
  input: ResolvePendingItemInput,
  pendingRepo: PendingItemRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<void>> {
  const item = await pendingRepo.findById(input.companyId, input.itemId);

  if (!item) {
    return failure(new ApplicationError('NOT_FOUND', 'Pending item not found'));
  }

  if (item.status === 'CLOSED') {
    return failure(new ApplicationError('INVALID_STATUS_TRANSITION', 'Pending item is already resolved'));
  }

  const previousState = JSON.stringify(item);

  item.status = 'CLOSED';
  item.updated_at = new Date();
  item.updated_by = input.userId;

  await pendingRepo.update(item);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'PendingItem',
    entity_id: item.id,
    action: 'UPDATE',
    previous_state: previousState,
    current_state: JSON.stringify(item),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(undefined);
}
