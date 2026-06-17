import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAdminUsersOperations } from '../createAdminUsersOperations';
import {
  UnitOfWork,
  TransactionContext
} from '../../../infrastructure/postgres/unit-of-work/UnitOfWork';
import {
  AuthenticatedSession,
  SafeAuthUser
} from '../../../application/auth/types';

const {
  ValidateSessionUseCaseMock,
  ListAdminUsersUseCaseMock,
  UpdateAdminUserStatusUseCaseMock,
  UpdateAdminUserPermissionsUseCaseMock,
  UpdateAdminUserRoleUseCaseMock,
  ResetAdminUserPasswordUseCaseMock
} = vi.hoisted(() => {
  return {
    ValidateSessionUseCaseMock: vi.fn(),
    ListAdminUsersUseCaseMock: vi.fn(),
    UpdateAdminUserStatusUseCaseMock: vi.fn(),
    UpdateAdminUserPermissionsUseCaseMock: vi.fn(),
    UpdateAdminUserRoleUseCaseMock: vi.fn(),
    ResetAdminUserPasswordUseCaseMock: vi.fn()
  };
});

vi.mock('../../../application/auth/use-cases/ValidateSessionUseCase', () => {
  return {
    ValidateSessionUseCase: vi.fn().mockImplementation(function () {
      return { execute: ValidateSessionUseCaseMock };
    })
  };
});

vi.mock('../../../application/auth/use-cases/ListAdminUsersUseCase', () => {
  return {
    ListAdminUsersUseCase: vi.fn().mockImplementation(function () {
      return { execute: ListAdminUsersUseCaseMock };
    })
  };
});

vi.mock('../../../application/auth/use-cases/UpdateAdminUserStatusUseCase', () => {
  return {
    UpdateAdminUserStatusUseCase: vi.fn().mockImplementation(function () {
      return { execute: UpdateAdminUserStatusUseCaseMock };
    })
  };
});

vi.mock('../../../application/auth/use-cases/UpdateAdminUserPermissionsUseCase', () => {
  return {
    UpdateAdminUserPermissionsUseCase: vi.fn().mockImplementation(function () {
      return { execute: UpdateAdminUserPermissionsUseCaseMock };
    })
  };
});

vi.mock('../../../application/auth/use-cases/UpdateAdminUserRoleUseCase', () => {
  return {
    UpdateAdminUserRoleUseCase: vi.fn().mockImplementation(function () {
      return { execute: UpdateAdminUserRoleUseCaseMock };
    })
  };
});

vi.mock('../../../application/auth/use-cases/ResetAdminUserPasswordUseCase', () => {
  return {
    ResetAdminUserPasswordUseCase: vi.fn().mockImplementation(function () {
      return { execute: ResetAdminUserPasswordUseCaseMock };
    })
  };
});

describe('createAdminUsersOperations factory', () => {
  let fakeUow: UnitOfWork;
  let transactionCompanyIds: string[];

  const validCompanyId = 'comp-123';

  const session: AuthenticatedSession = {
    userId: 'user-123',
    companyId: validCompanyId,
    email: 'test@yopoy.com',
    role: 'admin',
    permissions: []
  };

  beforeEach(() => {
    vi.clearAllMocks();

    const fakeExecutor = {} as TransactionContext['executor'];
    transactionCompanyIds = [];

    const transaction: UnitOfWork['transaction'] = async <T>(
      companyId: string,
      fn: (tx: TransactionContext) => Promise<T>
    ): Promise<T> => {
      transactionCompanyIds.push(companyId);
      return fn({ executor: fakeExecutor });
    };

    fakeUow = { transaction };
  });

  it('validateSession executa dentro de transaction e chama ValidateSessionUseCase', async () => {
    ValidateSessionUseCaseMock.mockResolvedValue({
      authenticated: true,
      session
    });

    const ops = createAdminUsersOperations(fakeUow);

    const result = await ops.validateSession(validCompanyId, 'raw-token');

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(ValidateSessionUseCaseMock).toHaveBeenCalledWith({
      rawSessionToken: 'raw-token'
    });

    expect(result.authenticated).toBe(true);
    expect(result.session).toEqual(session);
  });

  it('listUsers executa dentro de transaction e retorna SafeAuthUser[]', async () => {
    const mockUsers: SafeAuthUser[] = [
      {
        id: 'user-1',
        email: 'test@a.com',
        companyId: validCompanyId,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null
      }
    ];

    ListAdminUsersUseCaseMock.mockResolvedValue(mockUsers);

    const ops = createAdminUsersOperations(fakeUow);
    const result = await ops.listUsers(validCompanyId, session);

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(ListAdminUsersUseCaseMock).toHaveBeenCalledWith({ session });
    expect(result).toEqual(mockUsers);
  });

  it('updateStatus executa dentro de transaction e chama UpdateAdminUserStatusUseCase', async () => {
    UpdateAdminUserStatusUseCaseMock.mockResolvedValue(undefined);

    const ops = createAdminUsersOperations(fakeUow);

    await ops.updateStatus(validCompanyId, session, 'target-1', false);

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(UpdateAdminUserStatusUseCaseMock).toHaveBeenCalledWith({
      session,
      targetUserId: 'target-1',
      active: false
    });
  });

  it('updatePermissions executa dentro de transaction e chama UpdateAdminUserPermissionsUseCase', async () => {
    UpdateAdminUserPermissionsUseCaseMock.mockResolvedValue(undefined);

    const ops = createAdminUsersOperations(fakeUow);

    await ops.updatePermissions(
      validCompanyId,
      session,
      'target-1',
      ['admin:audit:view']
    );

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(UpdateAdminUserPermissionsUseCaseMock).toHaveBeenCalledWith({
      session,
      targetUserId: 'target-1',
      permissions: ['admin:audit:view']
    });
  });

  it('updateRole executa dentro de transaction e chama UpdateAdminUserRoleUseCase', async () => {
    UpdateAdminUserRoleUseCaseMock.mockResolvedValue(undefined);

    const ops = createAdminUsersOperations(fakeUow);

    await ops.updateRole(validCompanyId, session, 'target-1', 'admin');

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(UpdateAdminUserRoleUseCaseMock).toHaveBeenCalledWith({
      session,
      targetUserId: 'target-1',
      role: 'admin'
    });
  });

  it('resetPassword executa dentro de transaction e chama ResetAdminUserPasswordUseCase', async () => {
    ResetAdminUserPasswordUseCaseMock.mockResolvedValue(undefined);

    const ops = createAdminUsersOperations(fakeUow);

    await ops.resetPassword(validCompanyId, session, 'target-1', 'new-hash');

    expect(transactionCompanyIds).toEqual([validCompanyId]);

    expect(ResetAdminUserPasswordUseCaseMock).toHaveBeenCalledWith({
      session,
      targetUserId: 'target-1',
      newPasswordHash: 'new-hash'
    });
  });
});
