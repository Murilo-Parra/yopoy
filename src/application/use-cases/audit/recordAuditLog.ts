import { AuditLog } from '../../../domain/entities';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success } from '../../shared';

interface RecordAuditLogInput {
  companyId: string;
  userId: string;
  entityType: string;
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ARCHIVE' | 'LINK' | 'UNLINK';
  previousState?: string;
  currentState: string;
}

export async function recordAuditLog(
  input: RecordAuditLogInput,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<AuditLog>> {
  const generatedId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  const log: AuditLog = {
    id: generatedId,
    company_id: input.companyId,
    entity_type: input.entityType,
    entity_id: input.entityId,
    action: input.action,
    previous_state: input.previousState,
    current_state: input.currentState,
    user_id: input.userId,
    created_at: new Date()
  };

  await auditRepo.create(log);

  return success(log);
}
