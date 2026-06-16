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

dotenv.config({ path: '.env.local', override: true });

describe('Native Postgres Sandbox - Auth Repositories', () => {
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

  it('Should successfully test all real auth repositories operations with RLS isolation', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);

    // TRUNCATE is a privileged table action, run it globally to clean up
    await executor.execute({
      sql: 'TRUNCATE TABLE auth_sessions, auth_audit_logs, memberships, users, companies RESTART IDENTITY CASCADE;',
      mode: 'real',
      label: 'truncateAll'
    });

    const idC1 = randomUUID();
    const idC2 = randomUUID();

    const emailA = `usera-${randomUUID().substring(0, 8)}@compa.com`;
    const emailB = `userb-${randomUUID().substring(0, 8)}@compb.com`;

    let userAId = '';
    let userBId = '';

    // Set up Company A as idC1 context
    await uow.transaction(idC1, async (tx) => {
      const companyRepo = new PostgresCompanyAuthRepository(tx.executor);
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);
      const sessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const auditRepo = new PostgresAuthAuditRepository(tx.executor);

      await companyRepo.create({
        id: idC1,
        name: 'Company A',
        status: 'ACTIVE',
        created_at: new Date()
      });

      const userA = await userRepo.createUser({
        email: emailA,
        passwordHash: 'hashed_password_A',
        companyId: idC1
      });
      userAId = userA.id;

      await membershipRepo.createMembership({
        userId: userA.id,
        companyId: idC1,
        role: 'owner'
      });

      await sessionRepo.createSession({
        userId: userA.id,
        sessionTokenHash: 'token_hash_A',
        expiresAt: new Date(Date.now() + 3600000)
      });

      await auditRepo.recordAuthEvent({
        companyId: idC1,
        userId: userA.id,
        eventType: 'login_success',
        description: 'Login correto',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      });
    });

    // Set up Company B as idC2 context
    await uow.transaction(idC2, async (tx) => {
      const companyRepo = new PostgresCompanyAuthRepository(tx.executor);
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);
      const sessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const auditRepo = new PostgresAuthAuditRepository(tx.executor);

      await companyRepo.create({
        id: idC2,
        name: 'Company B',
        status: 'ACTIVE',
        created_at: new Date()
      });

      const userB = await userRepo.createUser({
        email: emailB,
        passwordHash: 'hashed_password_B',
        companyId: idC2
      });
      userBId = userB.id;

      await membershipRepo.createMembership({
        userId: userB.id,
        companyId: idC2,
        role: 'owner'
      });

      await sessionRepo.createSession({
        userId: userB.id,
        sessionTokenHash: 'token_hash_B',
        expiresAt: new Date(Date.now() + 3600000)
      });

      await auditRepo.recordAuthEvent({
        companyId: idC2,
        userId: userB.id,
        eventType: 'login_failed',
        description: 'Senha incorreta',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent'
      });
    });

    // Validate Company A isolation from idC1 transaction
    await uow.transaction(idC1, async (tx) => {
      const txUserRepo = new PostgresAuthUserRepository(tx.executor);
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txMembershipRepo = new PostgresMembershipRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      // We should find userA but NOT userB
      const foundUserA = await txUserRepo.findByEmail(emailA);
      expect(foundUserA).not.toBeNull();
      expect(foundUserA!.email).toBe(emailA);

      const foundUserB = await txUserRepo.findByEmail(emailB);
      expect(foundUserB).toBeNull(); // isolated under RLS!

      // Memberships
      const membershipsA = await txMembershipRepo.listMembershipsByCompany(idC1);
      expect(membershipsA.length).toBe(1);
      expect(membershipsA[0].companyId).toBe(idC1);

      const membershipsB = await txMembershipRepo.listMembershipsByCompany(idC2);
      expect(membershipsB.length).toBe(0); // isolated!

      // Sessions
      const sessionA = await txSessionRepo.findByTokenHash('token_hash_A');
      expect(sessionA).not.toBeNull();

      const sessionB = await txSessionRepo.findByTokenHash('token_hash_B');
      expect(sessionB).toBeNull(); // isolated!

      // Audits
      const logsA = await txAuditRepo.listAuthEventsByCompany(idC1);
      expect(logsA.length).toBe(1);
      expect(logsA[0].companyId).toBe(idC1);
    });

    // Run verification & manipulation steps inside Company A transaction
    await uow.transaction(idC1, async (tx) => {
      const txUserRepo = new PostgresAuthUserRepository(tx.executor);
      const txSessionRepo = new PostgresAuthSessionRepository(tx.executor);
      const txAuditRepo = new PostgresAuthAuditRepository(tx.executor);

      const attempts = await txUserRepo.incrementFailedLogin(userAId);
      expect(attempts).toBe(1);

      const reUser = await txUserRepo.findById(userAId);
      expect(reUser!.failedLoginAttempts).toBe(1);

      await txUserRepo.resetFailedLogin(userAId);
      const reUser2 = await txUserRepo.findById(userAId);
      expect(reUser2!.failedLoginAttempts).toBe(0);

      const lockDate = new Date(Date.now() + 60000);
      await txUserRepo.lockUserUntil(userAId, lockDate);
      const reUser3 = await txUserRepo.findById(userAId);
      expect(reUser3!.lockedUntil).not.toBeNull();

      await txUserRepo.updatePasswordHash(userAId, 'new_hashed');
      const reUser4 = await txUserRepo.findById(userAId);
      expect(reUser4!.passwordHash).toBe('new_hashed');

      const activeSession = await txSessionRepo.findByTokenHash('token_hash_A');
      expect(activeSession).not.toBeNull();
      await txSessionRepo.revokeSession(activeSession!.id);

      const revokedSession = await txSessionRepo.findByTokenHash('token_hash_A');
      expect(revokedSession!.revokedAt).not.toBeNull();

      const ev = await txAuditRepo.recordAuthEvent({
        companyId: idC1,
        userId: userAId,
        eventType: 'login_success',
        description: 'test metadata filtering',
        ipAddress: '1.2.3.4',
        userAgent: 'safari'
      });
      expect(ev.companyId).toBe(idC1);
    });

    await executor.end();
  }, 30000);
});
