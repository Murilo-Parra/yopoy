import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryAuthUserRepository } from '../testing/InMemoryAuthUserRepository';
import { InMemoryMembershipRepository } from '../testing/InMemoryMembershipRepository';
import { InMemoryAuthAuditRepository } from '../testing/InMemoryAuthAuditRepository';
import { RequirePermissionUseCase } from '../use-cases/RequirePermissionUseCase';

import { ListAdminUsersUseCase } from '../use-cases/ListAdminUsersUseCase';
import { UpdateAdminUserStatusUseCase } from '../use-cases/UpdateAdminUserStatusUseCase';
import { UpdateAdminUserPermissionsUseCase } from '../use-cases/UpdateAdminUserPermissionsUseCase';
import { UpdateAdminUserRoleUseCase } from '../use-cases/UpdateAdminUserRoleUseCase';
import { ResetAdminUserPasswordUseCase } from '../use-cases/ResetAdminUserPasswordUseCase';

import { AuthenticatedSession, AuthPermission } from '../types';

describe('Admin Users Use Cases', () => {
  let userRepository: InMemoryAuthUserRepository;
  let membershipRepository: InMemoryMembershipRepository;
  let auditRepository: InMemoryAuthAuditRepository;
  let requirePermissionUseCase: RequirePermissionUseCase;

  let listUsersUseCase: ListAdminUsersUseCase;
  let updateStatusUseCase: UpdateAdminUserStatusUseCase;
  let updatePermissionsUseCase: UpdateAdminUserPermissionsUseCase;
  let updateRoleUseCase: UpdateAdminUserRoleUseCase;
  let resetPasswordUseCase: ResetAdminUserPasswordUseCase;

  const validSession: AuthenticatedSession = {
    userId: 'admin_id',
    email: 'admin@test.com',
    companyId: 'company_id',
    role: 'admin',
    permissions: [
      'admin:users:view',
      'admin:users:manage',
      'admin:users:create',
      'admin:users:update',
      'admin:users:permissions:update',
      'admin:users:password:reset',
    ] as AuthPermission[],
  };

  const restrictedSession: AuthenticatedSession = {
    ...validSession,
    permissions: [],
    role: 'employee'
  };

  beforeEach(() => {
    userRepository = new InMemoryAuthUserRepository();
    membershipRepository = new InMemoryMembershipRepository();
    auditRepository = new InMemoryAuthAuditRepository();
    requirePermissionUseCase = new RequirePermissionUseCase(auditRepository);

    listUsersUseCase = new ListAdminUsersUseCase(userRepository, requirePermissionUseCase);
    updateStatusUseCase = new UpdateAdminUserStatusUseCase(userRepository, requirePermissionUseCase);
    updatePermissionsUseCase = new UpdateAdminUserPermissionsUseCase(membershipRepository, requirePermissionUseCase);
    updateRoleUseCase = new UpdateAdminUserRoleUseCase(membershipRepository, requirePermissionUseCase);
    resetPasswordUseCase = new ResetAdminUserPasswordUseCase(userRepository, requirePermissionUseCase);
  });

  describe('ListAdminUsersUseCase', () => {
    it('requires admin:users:view and returns only safe users from the same company', async () => {
      userRepository.users.push({
        id: 'user_1',
        email: 'user1@test.com',
        passwordHash: 'secret_hash1',
        companyId: 'company_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null
      });

      userRepository.users.push({
        id: 'user_2',
        email: 'user2@other.com',
        passwordHash: 'secret_hash2',
        companyId: 'other_company_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null
      });

      const users = await listUsersUseCase.execute({ session: validSession });

      expect(users).toHaveLength(1);
      expect(users[0].id).toBe('user_1');
      expect((users[0] as any).passwordHash).toBeUndefined();
      expect((users[0] as any).sessionTokenHash).toBeUndefined();
      expect((users[0] as any).rawSessionToken).toBeUndefined();

      await expect(listUsersUseCase.execute({ session: restrictedSession }))
        .rejects.toThrow('Acesso negado. Permissão insuficiente.');
    });
  });

  describe('UpdateAdminUserStatusUseCase', () => {
    it('requires admin:users:update and calls update status scoped by company', async () => {
      userRepository.users.push({
        id: 'user_1',
        email: 'user1@test.com',
        passwordHash: 'secret_hash1',
        companyId: 'company_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null
      });

      await updateStatusUseCase.execute({
        session: validSession,
        targetUserId: 'user_1',
        active: false
      });

      expect(userRepository.activeMap['user_1']).toBe(false);

      await expect(updateStatusUseCase.execute({
        session: restrictedSession,
        targetUserId: 'user_1',
        active: false
      })).rejects.toThrow('Acesso negado. Permissão insuficiente.');
    });
  });

  describe('UpdateAdminUserPermissionsUseCase', () => {
    it('requires admin:users:permissions:update and updates membership permissions', async () => {
      membershipRepository.memberships.push({
        id: 'mem_1',
        userId: 'user_1',
        companyId: 'company_id',
        role: 'employee',
        isActive: true,
        permissions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await updatePermissionsUseCase.execute({
        session: validSession,
        targetUserId: 'user_1',
        permissions: ['admin:audit:view']
      });

      expect(membershipRepository.memberships[0].permissions).toContain('admin:audit:view');

      await expect(updatePermissionsUseCase.execute({
        session: validSession,
        targetUserId: 'invalid_user',
        permissions: []
      })).rejects.toThrow('Vínculo do usuário com a empresa não localizado.');

      await expect(updatePermissionsUseCase.execute({
        session: restrictedSession,
        targetUserId: 'user_1',
        permissions: []
      })).rejects.toThrow('Acesso negado. Permissão insuficiente.');
    });
  });

  describe('UpdateAdminUserRoleUseCase', () => {
    it('requires admin:users:manage and updates membership role', async () => {
      membershipRepository.memberships.push({
        id: 'mem_1',
        userId: 'user_1',
        companyId: 'company_id',
        role: 'employee',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await updateRoleUseCase.execute({
        session: validSession,
        targetUserId: 'user_1',
        role: 'admin'
      });

      expect(membershipRepository.memberships[0].role).toBe('admin');

      await expect(updateRoleUseCase.execute({
        session: validSession,
        targetUserId: 'invalid_user',
        role: 'admin'
      })).rejects.toThrow('Vínculo do usuário com a empresa não localizado.');

      await expect(updateRoleUseCase.execute({
        session: restrictedSession,
        targetUserId: 'user_1',
        role: 'admin'
      })).rejects.toThrow('Acesso negado. Permissão insuficiente.');
    });
  });

  describe('ResetAdminUserPasswordUseCase', () => {
    it('requires admin:users:password:reset and resets only users from same company without returning a password', async () => {
      userRepository.users.push({
        id: 'user_1',
        email: 'user1@test.com',
        passwordHash: 'old_hash',
        companyId: 'company_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null
      });

      const result = await resetPasswordUseCase.execute({
        session: validSession,
        targetUserId: 'user_1',
        newPasswordHash: 'new_hash'
      });

      expect(result).toBeUndefined();
      expect(userRepository.users[0].passwordHash).toBe('new_hash');

      userRepository.users.push({
        id: 'user_2',
        email: 'user2@other.com',
        passwordHash: 'old_hash',
        companyId: 'other_company_id',
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null
      });

      await expect(resetPasswordUseCase.execute({
        session: validSession,
        targetUserId: 'user_2',
        newPasswordHash: 'new_hash'
      })).rejects.toThrow('Usuário não encontrado.');

      await expect(resetPasswordUseCase.execute({
        session: restrictedSession,
        targetUserId: 'user_1',
        newPasswordHash: 'new_hash'
      })).rejects.toThrow('Acesso negado. Permissão insuficiente.');
    });
  });
});
