import { describe, it, expect, beforeAll } from 'vitest';
import * as dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';

import { PostgresAuthUserRepository } from '../../postgres/auth/PostgresAuthUserRepository';
import { PostgresCompanyAuthRepository } from '../../postgres/auth/PostgresCompanyAuthRepository';
import { PostgresMembershipRepository } from '../../postgres/auth/PostgresMembershipRepository';
import { PostgresAuthSessionRepository } from '../../postgres/auth/PostgresAuthSessionRepository';
import { PostgresAuthAuditRepository } from '../../postgres/auth/PostgresAuthAuditRepository';

import { LoginUseCase } from '../../../application/auth/use-cases/LoginUseCase';
import { ValidateSessionUseCase } from '../../../application/auth/use-cases/ValidateSessionUseCase';
import { LogoutUseCase } from '../../../application/auth/use-cases/LogoutUseCase';
import { RequirePermissionUseCase } from '../../../application/auth/use-cases/RequirePermissionUseCase';

import { BcryptPasswordHasher } from '../../auth/BcryptPasswordHasher';
import { NodeCryptoSessionTokenService } from '../../auth/NodeCryptoSessionTokenService';

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Auth Use Cases Integration', () => {
  let hasDb = false;
  let dbUrl: string;

  beforeAll(async () => {
    dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl) {
      try {
        assertLocalDatabaseUrl(dbUrl);
        const { Client } = await import('pg');
        const client = new Client({ connectionString: dbUrl, connectionTimeoutMillis: 1000 });
        await client.connect();
        await client.end();
        hasDb = true;
      } catch (err) {
        hasDb = false;
      }
    }
  });

  it('Should register, login, validate, and logout cleanly with actual Postgres repositories', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);

    const passwordHasher = new BcryptPasswordHasher(4);
    const tokenService = new NodeCryptoSessionTokenService();

    // Clean tables before test sequence (Truncate doesn't run with RLS constraints)
    await executor.execute({
      sql: 'TRUNCATE TABLE auth_sessions, auth_audit_logs, memberships, users, companies RESTART IDENTITY CASCADE;',
      mode: 'real',
      label: 'truncateAll'
    });

    const companyId = randomUUID();
    const email = `admin-${randomUUID().substring(0, 8)}@supercorp.com`;
    const password = 'N7!rKq4#vM2zLw9';
    let userId: string;
    const passwordHash = await passwordHasher.hashPassword(password);

    // 1. Create company, user & membership owner
    await uow.transaction(companyId, async (tx) => {
      const companyRepo = new PostgresCompanyAuthRepository(tx.executor);
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);

      await companyRepo.create({
        id: companyId,
        name: 'Super Corp',
        status: 'ACTIVE',
        created_at: new Date()
      });

      const user = await userRepo.createUser({
        email,
        passwordHash,
        companyId
      });
      userId = user.id;

      await membershipRepo.createMembership({
        userId: user.id,
        companyId,
        role: 'owner'
      });
    });

    // 2. Run LoginUseCase under uow.transaction context
    let loginResult: any;
    await uow.transaction(companyId, async (tx) => {
      const txUserRepo = new PostgresAuthUserRepository(tx.executor);
      const txMembershipRepo = new PostgresMembershipRepository(tx.executor);
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      const loginUseCase = new LoginUseCase(
        txUserRepo,
        txMembershipRepo,
        txSessionRepo,
        txAuditRepo,
        tokenService,
        passwordHasher,
        5,
        15
      );

      loginResult = await loginUseCase.execute({
        email,
        password,
        companyId
      });
    });

    expect(loginResult.user.email).toBe(email);
    expect(loginResult.rawSessionToken).toBeDefined();
    expect(loginResult.session.id).toBeDefined();

    // 3. Run ValidateSessionUseCase under uow.transaction context
    let authResult: any;
    await uow.transaction(companyId, async (tx) => {
      const txUserRepo = new PostgresAuthUserRepository(tx.executor);
      const txMembershipRepo = new PostgresMembershipRepository(tx.executor);
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      const validateUseCase = new ValidateSessionUseCase(
        txSessionRepo,
        txUserRepo,
        txMembershipRepo,
        txAuditRepo,
        tokenService
      );

      authResult = await validateUseCase.execute({
        rawSessionToken: loginResult.rawSessionToken
      });
    });

    expect(authResult.authenticated).toBe(true);
    expect(authResult.session.email).toBe(email);
    expect(authResult.session.companyId).toBe(companyId);
    expect(authResult.session.role).toBe('owner');

    // 4. Run RequirePermissionUseCase
    const auditRepo = new PostgresAuthAuditRepository(executor);
    const requirePermissionUseCase = new RequirePermissionUseCase(auditRepo);
    await expect(
      requirePermissionUseCase.execute({
        session: authResult.session,
        permission: 'company:read'
      })
    ).resolves.not.toThrow();

    // 5. Run LogoutUseCase under uow.transaction context
    await uow.transaction(companyId, async (tx) => {
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      const logoutUseCase = new LogoutUseCase(
        txSessionRepo,
        txAuditRepo
      );

      await logoutUseCase.execute({
        sessionId: loginResult.session.id,
        companyId,
        userId
      });
    });

    // 6. Validate that session is no longer authenticated post-logout
    let authResultPostLogout: any;
    await uow.transaction(companyId, async (tx) => {
      const txUserRepo = new PostgresAuthUserRepository(tx.executor);
      const txMembershipRepo = new PostgresMembershipRepository(tx.executor);
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      const validateUseCase = new ValidateSessionUseCase(
        txSessionRepo,
        txUserRepo,
        txMembershipRepo,
        txAuditRepo,
        tokenService
      );

      authResultPostLogout = await validateUseCase.execute({
        rawSessionToken: loginResult.rawSessionToken
      });
    });

    expect(authResultPostLogout.authenticated).toBe(false);

    await executor.end();
  }, 30000);
});
