import { describe, it, expect, beforeAll } from 'vitest';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';
import { LocalPostgresSqlExecutor } from '../../postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../postgres/unit-of-work/LocalPostgresUnitOfWork';
import { PostgresAuthUserRepository } from '../../postgres/auth/PostgresAuthUserRepository';
import { PostgresMembershipRepository } from '../../postgres/auth/PostgresMembershipRepository';
import { AuthPermission } from '../../../application/auth/types';

dotenv.config({ path: '.env.local', override: true });

async function insertCompanyWithTenantContext(
  pool: Pool,
  companyId: string,
  name: string
): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(
      "SELECT set_config('app.current_company_id', $1, true)",
      [companyId]
    );
    await client.query(
      'INSERT INTO companies (id, name) VALUES ($1, $2)',
      [companyId, name]
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

describe('Native Postgres Sandbox - Admin Users Repositories', () => {
  let hasDb = false;
  let dbUrl = '';

  beforeAll(() => {
    dbUrl = process.env.DATABASE_URL || '';

    if (dbUrl) {
      try {
        assertLocalDatabaseUrl(dbUrl);
        hasDb = true;
      } catch {
        hasDb = false;
      }
    }
  });

  it('isolates admin user repository operations by company context', async () => {
    if (!hasDb) return;

    const executor = new LocalPostgresSqlExecutor(dbUrl);
    const uow = new LocalPostgresUnitOfWork(executor);
    const pool = new Pool({ connectionString: dbUrl });

    await pool.query(`
      TRUNCATE TABLE
        auth_sessions,
        auth_audit_logs,
        memberships,
        users,
        companies
      RESTART IDENTITY CASCADE;
    `);

    const idC1 = crypto.randomUUID();
    const idC2 = crypto.randomUUID();

    await insertCompanyWithTenantContext(pool, idC1, 'Admin Users C1');
    await insertCompanyWithTenantContext(pool, idC2, 'Admin Users C2');

    let userAId = '';
    let userBId = '';
    let membershipAId = '';

    const emailA = `admin-users-a-${Date.now()}@c1.test`;
    const emailB = `admin-users-b-${Date.now()}@c2.test`;

    await uow.transaction(idC1, async (tx) => {
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);

      const userA = await userRepo.createUser({
        email: emailA,
        passwordHash: 'hashed_password_A',
        companyId: idC1
      });

      userAId = userA.id;

      const membershipA = await membershipRepo.createMembership({
        userId: userA.id,
        companyId: idC1,
        role: 'owner'
      });

      membershipAId = membershipA.id;
    });

    await uow.transaction(idC2, async (tx) => {
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);

      const userB = await userRepo.createUser({
        email: emailB,
        passwordHash: 'hashed_password_B',
        companyId: idC2
      });

      userBId = userB.id;

      await membershipRepo.createMembership({
        userId: userB.id,
        companyId: idC2,
        role: 'employee'
      });
    });

    await uow.transaction(idC1, async (tx) => {
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const membershipRepo = new PostgresMembershipRepository(tx.executor);

      const usersC1 = await userRepo.listCompanyUsers(idC1);

      expect(usersC1).toHaveLength(1);
      expect(usersC1[0].id).toBe(userAId);
      expect((usersC1[0] as any).passwordHash).toBeUndefined();
      expect((usersC1[0] as any).sessionTokenHash).toBeUndefined();
      expect((usersC1[0] as any).rawSessionToken).toBeUndefined();

      const usersC2FromC1Context = await userRepo.listCompanyUsers(idC2);
      expect(usersC2FromC1Context).toHaveLength(0);

      const foundA = await userRepo.findByEmailWithinCompany(emailA, idC1);
      expect(foundA?.id).toBe(userAId);

      const foundBFromC1Context = await userRepo.findByEmailWithinCompany(emailB, idC2);
      expect(foundBFromC1Context).toBeNull();

      await userRepo.updateUserStatus(userAId, idC1, false);

      const statusRows = (await tx.executor.execute({
        sql: 'SELECT active FROM users WHERE id = $1',
        params: [userAId],
        mode: 'real',
        label: 'assertOwnUserStatus'
      })) as any[];

      expect(statusRows[0].active).toBe(false);

      await userRepo.updatePasswordHash(userAId, 'new_hash_A');
      expect((await userRepo.findById(userAId))?.passwordHash).toBe('new_hash_A');

      await userRepo.updatePasswordHash(userBId, 'hacked_hash_B');
      expect(await userRepo.findById(userBId)).toBeNull();

      const membershipsC1 = await membershipRepo.listMembershipsByCompany(idC1);
      expect(membershipsC1).toHaveLength(1);

      const permissions: AuthPermission[] = ['admin:users:manage'];

      await membershipRepo.updatePermissions(membershipAId, permissions);

      const updatedMembership = await membershipRepo.findMembership(userAId, idC1);
      expect(updatedMembership?.permissions).toEqual(permissions);

      await membershipRepo.updateMembershipStatus(membershipAId, false);

      const disabledMembership = await membershipRepo.findMembership(userAId, idC1);
      expect(disabledMembership?.isActive).toBe(false);
    });

    await uow.transaction(idC2, async (tx) => {
      const userRepo = new PostgresAuthUserRepository(tx.executor);
      const userB = await userRepo.findById(userBId);

      expect(userB?.passwordHash).toBe('hashed_password_B');
    });

    await pool.end();
    await executor.end();
  }, 30000);
});
