import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { AuthenticatedSession, AuthPermission } from '../types';
import { AuthPermissionDeniedError } from '../AuthErrors';
import { roleHasPermission } from '../../../security/permissions/permissions';

export interface RequirePermissionInput {
  session: AuthenticatedSession;
  permission: AuthPermission;
}

export class RequirePermissionUseCase {
  constructor(private readonly auditRepository: AuthAuditRepository) {}

  async execute(input: RequirePermissionInput): Promise<void> {
    const { session, permission } = input;

    if (!session) {
      throw new AuthPermissionDeniedError();
    }

    const hasAccess = session.permissions?.includes(permission) || roleHasPermission(session.role, permission);

    if (!hasAccess) {
      // Record denied audit event for security monitoring
      await this.auditRepository.recordAuthEvent({
        companyId: session.companyId || null,
        userId: session.userId || null,
        eventType: 'permission_denied',
        description: `Acesso negado: Usuário ID ${session.userId} com o papel "${session.role}" tentou realizar ação restrita "${permission}".`,
        ipAddress: null,
        userAgent: null,
      });

      throw new AuthPermissionDeniedError();
    }
  }
}
