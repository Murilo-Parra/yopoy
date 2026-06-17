import { AdminUsersOperations } from './AdminUsersHttpHandlers';
import { UnitOfWork } from '../../infrastructure/postgres/unit-of-work/UnitOfWork';
import {
  AuthenticatedSession,
  AuthRole,
  SafeAuthUser,
  AuthPermission
} from '../../application/auth/types';

import { ValidateSessionUseCase } from '../../application/auth/use-cases/ValidateSessionUseCase';
import { ListAdminUsersUseCase } from '../../application/auth/use-cases/ListAdminUsersUseCase';
import { UpdateAdminUserStatusUseCase } from '../../application/auth/use-cases/UpdateAdminUserStatusUseCase';
import { UpdateAdminUserPermissionsUseCase } from '../../application/auth/use-cases/UpdateAdminUserPermissionsUseCase';
import { UpdateAdminUserRoleUseCase } from '../../application/auth/use-cases/UpdateAdminUserRoleUseCase';
import { ResetAdminUserPasswordUseCase } from '../../application/auth/use-cases/ResetAdminUserPasswordUseCase';
import { RequirePermissionUseCase } from '../../application/auth/use-cases/RequirePermissionUseCase';

import { PostgresAuthSessionRepository } from '../../infrastructure/postgres/auth/PostgresAuthSessionRepository';
import { PostgresAuthUserRepository } from '../../infrastructure/postgres/auth/PostgresAuthUserRepository';
import { PostgresMembershipRepository } from '../../infrastructure/postgres/auth/PostgresMembershipRepository';
import { PostgresAuthAuditRepository } from '../../infrastructure/postgres/auth/PostgresAuthAuditRepository';

import { NodeCryptoSessionTokenService } from '../../infrastructure/auth/NodeCryptoSessionTokenService';

export function createAdminUsersOperations(uow: UnitOfWork): AdminUsersOperations {
  return {
    async validateSession(
      companyId: string,
      rawSessionToken: string
    ): Promise<{ authenticated: boolean; session?: AuthenticatedSession }> {
      return uow.transaction(companyId, async (tx) => {
        const sessionRepository = new PostgresAuthSessionRepository(tx.executor);
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const sessionTokenService = new NodeCryptoSessionTokenService();

        const useCase = new ValidateSessionUseCase(
          sessionRepository,
          userRepository,
          membershipRepository,
          auditRepository,
          sessionTokenService
        );

        return useCase.execute({ rawSessionToken });
      });
    },

    async listUsers(
      companyId: string,
      session: AuthenticatedSession
    ): Promise<SafeAuthUser[]> {
      return uow.transaction(companyId, async (tx) => {
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        const useCase = new ListAdminUsersUseCase(
          userRepository,
          requirePermissionUseCase
        );

        return useCase.execute({ session });
      });
    },

    async updateStatus(
      companyId: string,
      session: AuthenticatedSession,
      targetUserId: string,
      active: boolean
    ): Promise<void> {
      return uow.transaction(companyId, async (tx) => {
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        const useCase = new UpdateAdminUserStatusUseCase(
          userRepository,
          requirePermissionUseCase
        );

        await useCase.execute({ session, targetUserId, active });
      });
    },
    async updatePermissions(
      companyId: string,
      session: AuthenticatedSession,
      targetUserId: string,
      permissions: AuthPermission[]
    ): Promise<void> {
      return uow.transaction(companyId, async (tx) => {
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        const useCase = new UpdateAdminUserPermissionsUseCase(
          membershipRepository,
          requirePermissionUseCase
        );

        await useCase.execute({ session, targetUserId, permissions });
      });
    },

    async updateRole(
      companyId: string,
      session: AuthenticatedSession,
      targetUserId: string,
      role: AuthRole
    ): Promise<void> {
      return uow.transaction(companyId, async (tx) => {
        const membershipRepository = new PostgresMembershipRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        const useCase = new UpdateAdminUserRoleUseCase(
          membershipRepository,
          requirePermissionUseCase
        );

        await useCase.execute({ session, targetUserId, role });
      });
    },

    async resetPassword(
      companyId: string,
      session: AuthenticatedSession,
      targetUserId: string,
      newPasswordHash: string
    ): Promise<void> {
      return uow.transaction(companyId, async (tx) => {
        const userRepository = new PostgresAuthUserRepository(tx.executor);
        const auditRepository = new PostgresAuthAuditRepository(tx.executor);
        const requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);
        const useCase = new ResetAdminUserPasswordUseCase(
          userRepository,
          requirePermissionUseCase
        );

        await useCase.execute({ session, targetUserId, newPasswordHash });
      });
    }
  };
}
