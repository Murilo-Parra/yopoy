import { CashSessionRepository } from '../../repositories/CashSessionRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface CloseCashSessionInput {
  companyId: string;
  userId: string;
  sessionId: string;
  finalBalance: number;
}

export async function closeCashSession(
  input: CloseCashSessionInput,
  cashRepo: CashSessionRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<void>> {
  const session = await cashRepo.findById(input.companyId, input.sessionId);

  if (!session) {
    return failure(new ApplicationError('NOT_FOUND', 'Cash session not found'));
  }

  if (session.closed_at) {
    return failure(new ApplicationError('INVALID_STATUS_TRANSITION', 'Cash session is already closed'));
  }

  const previousState = JSON.stringify(session);

  session.closed_at = new Date();
  session.final_balance = input.finalBalance;
  session.status = 'CLOSED';
  session.updated_at = new Date();
  session.updated_by = input.userId;

  await cashRepo.update(session);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'CashSession',
    entity_id: session.id,
    action: 'UPDATE',
    previous_state: previousState,
    current_state: JSON.stringify(session),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(undefined);
}
