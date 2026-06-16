import { PendingItem } from '../../../domain/entities';
import { PendingItemRepository } from '../../repositories/PendingItemRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CreatePendingItemInput {
  companyId: string;
  userId: string;
  type: 'UNLINKED_PAYMENT' | 'UNPAID_SALE' | 'UNREVIEWED_DRAFT';
  referenceId: string;
  amount?: number;
}

export async function createPendingItem(
  input: CreatePendingItemInput,
  pendingRepo: PendingItemRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<PendingItem>> {
  const item: PendingItem = {
    id: randomUUID(),
    company_id: input.companyId,
    type: input.type,
    reference_id: input.referenceId,
    amount: input.amount,
    status: 'PENDING',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  };

  await pendingRepo.create(item);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'PendingItem',
    entity_id: item.id,
    action: 'CREATE',
    current_state: JSON.stringify(item),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(item);
}
