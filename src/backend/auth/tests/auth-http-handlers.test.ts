import { beforeAll, describe, expect, it } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

import { LocalPostgresSqlExecutor } from '../../../infrastructure/postgres/executor/LocalPostgresSqlExecutor';
import { LocalPostgresUnitOfWork } from '../../../infrastructure/postgres/unit-of-work/LocalPostgresUnitOfWork';
import { assertLocalDatabaseUrl } from '../../../infrastructure/postgres/guards/assertLocalDatabaseUrl';
import { AuthHttpHandlers } from '../AuthHttpHandlers';
import { registerAuthRoutes } from '../registerAuthRoutes';
import { BcryptPasswordHasher } from '../../../infrastructure/auth/BcryptPasswordHasher';
import { PostgresCompanyAuthRepository } from '../../../infrastructure/postgres/auth/PostgresCompanyAuthRepository';
import { PostgresAuthUserRepository } from '../../../infrastructure/postgres/auth/PostgresAuthUserRepository';
import { PostgresMembershipRepository } from '../../../infrastructure/postgres/auth/PostgresMembershipRepository';

dotenv.config({ path: '.env.local', override: true });

describe('AuthHttpHandlers Integration Tests', () => {
  let app: Express;
  let hasDb = false;
  let dbUrl: string;
  let uow: LocalPostgresUnitOfWork;
  let executor: LocalPostgresSqlExecutor;

  // Set up test credentials
  const companyId = randomUUID();
  const userEmail = `admin-${randomUUID().substring(0, 8)}@yopoy-test.com`;
  const userPassword = 'N7!rKq4#vM2zLw9';
  let userId: string;

  function getSetCookies(response: any): string[] {
    const header = response.headers['set-cookie'];
    if (!header) {
      return [];
    }
    return Array.isArray(header) ? header : [header];
  }

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

        // Init Express test server
        executor = new LocalPostgresSqlExecutor(dbUrl);
        uow = new LocalPostgresUnitOfWork(executor);

        const handlers = new AuthHttpHandlers(uow);
        app = express();
        app.use(express.json());
        app.use('/api/auth', registerAuthRoutes(handlers));

        // Truncate and Seed the test company & user
        await executor.execute({
          sql: 'TRUNCATE TABLE auth_sessions, auth_audit_logs, memberships, users, companies RESTART IDENTITY CASCADE;',
          mode: 'real',
          label: 'truncateTestTables'
        });

        const passwordHasher = new BcryptPasswordHasher(4);
        const passwordHash = await passwordHasher.hashPassword(userPassword);

        await uow.transaction(companyId, async (tx) => {
          const companyRepo = new PostgresCompanyAuthRepository(tx.executor);
          const userRepo = new PostgresAuthUserRepository(tx.executor);
          const membershipRepo = new PostgresMembershipRepository(tx.executor);

          await companyRepo.create({
            id: companyId,
            name: 'Yopoy Test Company',
            status: 'ACTIVE',
            created_at: new Date()
          });

          const user = await userRepo.createUser({
            email: userEmail,
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

      } catch (err) {
        console.warn('Postgres connection failed/skipped in tests. Skipping DB-dependent tests.', err);
        hasDb = false;
      }
    }
  });

  it('Skip warning', () => {
    if (!hasDb) {
      console.warn('⚠️ DATABASE_URL is not set or accessible. Skipping real Postgres handler integration tests.');
    }
  });

  describe('POST /api/auth/login', () => {
    it('should successfully log in with correct credentials and set cookies', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe(userEmail);
      expect(res.body.user.companyId).toBe(companyId);
      expect(res.body.user.role).toBe('owner');
      expect(res.body.session).toBeDefined();
      expect(res.body.session.id).toBeDefined();

      // Ensure rawSessionToken doesn't leak in response body unless AUTH_DEBUG_RETURN_TOKEN=true
      expect(res.body.rawSessionToken).toBeUndefined();

      // Check cookie is set
      const cookies = getSetCookies(res);
      expect(cookies).toBeDefined();
      const sessionCookie = cookies.find((c: string) => c.startsWith('yopoy_session='));
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie).toContain('HttpOnly');
    });

    it('should reject login with wrong password and send 401', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: 'wrong_password'
        });

      expect(res.status).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should fail validation with invalid UUID companyId', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          companyId: 'invalid-uuid-format',
          email: userEmail,
          password: userPassword
        });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_INPUT');
    });
  });

  describe('GET /api/auth/session', () => {
    it('should validate session with valid cookie and companyId header', async () => {
      if (!hasDb) return;

      // 1. Login to get a valid session cookie
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      const loginCookies = getSetCookies(loginRes);
      const sessionCookie = loginCookies.find((c: string) => c.startsWith('yopoy_session='));

      // 2. Access session endpoint with cookie and header
      const res = await request(app)
        .get('/api/auth/session')
        .set('Cookie', sessionCookie)
        .set('X-Yopoy-Company-Id', companyId);

      expect(res.status).toBe(200);
      expect(res.body.authenticated).toBe(true);
      expect(res.body.session).toBeDefined();
      expect(res.body.session.userId).toBe(userId);
      expect(res.body.session.companyId).toBe(companyId);
      expect(res.body.session.role).toBe('owner');
      expect(res.body.session.permissions).toContain('company:read');
    });

    it('should return authenticated: false if no cookie is supplied', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .get('/api/auth/session')
        .set('X-Yopoy-Company-Id', companyId);

      expect(res.status).toBe(200);
      expect(res.body.authenticated).toBe(false);
    });

    it('should return authenticated: false if companyId header is missing', async () => {
      if (!hasDb) return;

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      const loginCookies = getSetCookies(loginRes);
      const sessionCookie = loginCookies.find((c: string) => c.startsWith('yopoy_session='));

      const res = await request(app)
        .get('/api/auth/session')
        .set('Cookie', sessionCookie);

      expect(res.status).toBe(200);
      expect(res.body.authenticated).toBe(false);
    });
  });

  describe('POST /api/auth/require-permission', () => {
    it('should return allowed: true for valid owner permission', async () => {
      if (!hasDb) return;

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      const loginCookies = getSetCookies(loginRes);
      const sessionCookie = loginCookies.find((c: string) => c.startsWith('yopoy_session='));

      const res = await request(app)
        .post('/api/auth/require-permission')
        .set('Cookie', sessionCookie)
        .send({
          companyId,
          permission: 'company:read'
        });

      expect(res.status).toBe(200);
      expect(res.body.allowed).toBe(true);
    });

    it('should fail with BAD_REQUEST if permission is not in acceptable permission list', async () => {
      if (!hasDb) return;

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      const loginCookies = getSetCookies(loginRes);
      const sessionCookie = loginCookies.find((c: string) => c.startsWith('yopoy_session='));

      const res = await request(app)
        .post('/api/auth/require-permission')
        .set('Cookie', sessionCookie)
        .send({
          companyId,
          permission: 'invalid:permission_type'
        });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_INPUT');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should successfully revoke session and wipe session cookie', async () => {
      if (!hasDb) return;

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          companyId,
          email: userEmail,
          password: userPassword
        });

      const loginCookies = getSetCookies(loginRes);
      const sessionCookie = loginCookies.find((c: string) => c.startsWith('yopoy_session='));

      const res = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', sessionCookie)
        .send({ companyId });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);

      // Verify cookie Max-Age=0 indicating deletion
      const setCookies = getSetCookies(res);
      expect(setCookies).toBeDefined();
      const clearedCookie = setCookies.find((c: string) => c.startsWith('yopoy_session='));
      expect(clearedCookie).toBeDefined();
      expect(clearedCookie).toContain('Max-Age=0');
    });
  });

  describe('POST /api/auth/register-company', () => {
    it('should return 501 BOOTSTRAP_NOT_IMPLEMENTED_SAFELY on safe fallback schema restrictions', async () => {
      if (!hasDb) return;

      const companyName = 'Secure New Firm';
      const adminName = 'Bob Builder';
      const adminMail = `bob-${randomUUID().substring(0, 8)}@buildercorp.com`;
      const adminPass = 'N7!rKq4#vM2zLw9';

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({
          companyName,
          adminFullName: adminName,
          adminEmail: adminMail,
          adminPassword: adminPass
        });

      expect(res.status).toBe(501);
      expect(res.body.error.code).toBe('BOOTSTRAP_NOT_IMPLEMENTED_SAFELY');
    });
  });
});
