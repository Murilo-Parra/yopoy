import { AuthSessionRepository } from '../contracts/AuthSessionRepository';
import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { AuthValidationError } from '../AuthErrors';

export interface LogoutInput {
  sessionId: string;
  companyId: string;
  userId: string;
}

export class LogoutUseCase {
  constructor(
    private readonly sessionRepository: AuthSessionRepository,
    private readonly auditRepository: AuthAuditRepository
  ) {}

  async execute(input: LogoutInput): Promise<void> {
    const { sessionId, companyId, userId } = input;

    if (!sessionId) {
      throw new AuthValidationError('Session ID é obrigatório para logout.');
    }

    // Revoke the session physically in repository
    await this.sessionRepository.revokeSession(sessionId);

    // Record logout event
    await this.auditRepository.recordAuthEvent({
      companyId: companyId || null,
      userId: userId || null,
      eventType: 'logout',
      description: `Sessão ID ${sessionId} encerrada de forma voluntária pelo usuário ID ${userId}.`,
      ipAddress: null,
      userAgent: null,
    });
  }
}
