import { CashSession } from '../../../domain/entities';
import { CashSessionRepository } from '../../repositories/CashSessionRepository';
import { AuditLogRepository } from '../../repositories/AuditLogRepository';
import { UseCaseResult, success, failure, ApplicationError } from '../../shared';
import { generateUUID as randomUUID } from '../../shared';

interface OpenCashSessionInput {
  companyId: string;
  userId: string;
  initialBalance: number;
}

export async function openCashSession(
  input: OpenCashSessionInput,
  cashRepo: CashSessionRepository,
  auditRepo: AuditLogRepository
): Promise<UseCaseResult<CashSession>> {
  if (input.initialBalance < 0) {
    return failure(new ApplicationError('VALIDATION_ERROR', 'Initial balance cannot be negative'));
  }

  const activeSession = await cashRepo.findActiveSession(input.companyId);
  if (activeSession) {
    return failure(new ApplicationError('CASH_SESSION_ALREADY_OPEN', 'A cash session is already open for this company'));
  }

  const session: CashSession = {
    id: randomUUID(),
    company_id: input.companyId,
    opened_at: new Date(),
    initial_balance: input.initialBalance,
    status: 'ACTIVE',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: input.userId
  };

  await cashRepo.create(session);

  await auditRepo.create({
    id: randomUUID(),
    company_id: input.companyId,
    entity_type: 'CashSession',
    entity_id: session.id,
    action: 'CREATE',
    current_state: JSON.stringify(session),
    user_id: input.userId,
    created_at: new Date()
  });

  return success(session);
}
