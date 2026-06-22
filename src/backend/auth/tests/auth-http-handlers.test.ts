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
          email: userEmail,
          password: 'wrong_password'
        });

      expect(res.status).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should not require or validate companyId', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: userEmail,
          password: userPassword
        });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
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

    it('should validate the cookie without a companyId header', async () => {
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
      expect(res.body.authenticated).toBe(true);
      expect(res.body.session.companyId).toBe(companyId);
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
    const validAdmin = () => ({
      nomeCompleto: 'Administrador Principal',
      email: `admin-${randomUUID().substring(0, 8)}@empresa.com`,
      senha: 'N7!rKq4#vM2zLw9',
      confirmarSenha: 'N7!rKq4#vM2zLw9'
    });

    const validRegistrationPayload = () => ({
      company: {
        razaoSocial: 'Empresa Teste LTDA ' + randomUUID().substring(0, 8),
        nomeFantasia: 'Empresa Teste',
        cnpj: '00000000000100',
        email: `contato-${randomUUID().substring(0, 8)}@empresa.com`,
        telefone: '11999999999',
        endereco: {
          rua: 'Rua Exemplo',
          numero: '100',
          cidade: 'São Paulo',
          uf: 'SP'
        },
        regimeTributario: 'simples_nacional'
      },
      admin: validAdmin()
    });

    async function findStoredCompany(companyId: string): Promise<{ name: string; document: string | null }> {
      return uow.transaction(companyId, async (tx) => {
        const rows = await tx.executor.execute<Array<{ name: string; document: string | null }>>({
          sql: 'SELECT name, document FROM companies WHERE id = $1',
          params: [companyId],
          mode: 'real',
          label: 'findStoredCompanyForSignupTest'
        });
        return rows[0];
      });
    }

    it('should register with only admin and workspace name, persisting no CNPJ', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({
          admin: validAdmin(),
          company: { razaoSocial: 'Meu workspace local' }
        });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.company.razaoSocial).toBe('Meu workspace local');
      expect(res.body.company.cnpj).toBeNull();
      expect(res.body.user.id).toBeDefined();
      expect(res.body.session.id).toBeDefined();

      const storedCompany = await findStoredCompany(res.body.company.id);
      expect(storedCompany.name).toBe('Meu workspace local');
      expect(storedCompany.document).toBeNull();
    });

    it('should use the safe workspace fallback when company is absent', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({ admin: validAdmin() });

      expect(res.status).toBe(200);
      expect(res.body.company.razaoSocial).toBe('Meu negócio');
      expect(res.body.company.nomeFantasia).toBe('Meu negócio');
      expect(res.body.company.cnpj).toBeNull();

      const storedCompany = await findStoredCompany(res.body.company.id);
      expect(storedCompany.name).toBe('Meu negócio');
      expect(storedCompany.document).toBeNull();
    });

    it('should use the safe workspace fallback when company name is absent', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({ admin: validAdmin(), company: {} });

      expect(res.status).toBe(200);
      expect(res.body.company.razaoSocial).toBe('Meu negócio');
      expect(res.body.company.cnpj).toBeNull();

      const storedCompany = await findStoredCompany(res.body.company.id);
      expect(storedCompany.name).toBe('Meu negócio');
      expect(storedCompany.document).toBeNull();
    });

    it('should successfully register a company, owner, membership, and session under RLS', async () => {
      if (!hasDb) return;

      const payload = validRegistrationPayload();
      const res = await request(app)
        .post('/api/auth/register-company')
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);

      // Verify returned objects
      expect(res.body.company.id).toBeDefined();
      expect(res.body.company.razaoSocial).toBe(payload.company.razaoSocial);
      expect(res.body.company.cnpj).toBe('00000000000100');

      const storedCompany = await findStoredCompany(res.body.company.id);
      expect(storedCompany.document).toBe('00000000000100');

      expect(res.body.user.id).toBeDefined();
      expect(res.body.user.companyId).toBe(res.body.company.id);
      expect(res.body.user.fullName).toBe(payload.admin.nomeCompleto);
      expect(res.body.user.email).toBe(payload.admin.email.toLowerCase().trim());
      expect(res.body.user.role).toBe('owner');

      expect(res.body.session.id).toBeDefined();
      expect(res.body.session.expiresAt).toBeDefined();

      // Negative assertions - no leaked tokens/secrets/hashes
      expect(res.body.rawSessionToken).toBeUndefined();
      expect(res.body.passwordHash).toBeUndefined();
      expect(res.body.sessionTokenHash).toBeUndefined();
      expect(res.body.tokenHash).toBeUndefined();
      expect(res.body.error).toBeUndefined();

      // Ensure HttpOnly cookie is set
      const cookies = getSetCookies(res);
      const sessionCookie = cookies.find((c: string) => c.startsWith('yopoy_session='));
      expect(sessionCookie).toBeDefined();
      expect(sessionCookie).toContain('HttpOnly');

      // Ensure login works after registration
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: payload.admin.email,
          password: payload.admin.senha
        });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.ok).toBe(true);
      expect(loginRes.body.user.id).toBe(res.body.user.id);

      // Ensure session validation works with the registered cookie
      const valCookies = getSetCookies(loginRes);
      const valSessionCookie = valCookies.find((c: string) => c.startsWith('yopoy_session='));

      const valRes = await request(app)
        .get('/api/auth/session')
        .set('Cookie', valSessionCookie);

      expect(valRes.status).toBe(200);
      expect(valRes.body.authenticated).toBe(true);
      expect(valRes.body.session.userId).toBe(res.body.user.id);

      const registerCookies = getSetCookies(res);
      const registerSessionCookie = registerCookies.find((c: string) => c.startsWith('yopoy_session='));
      const registerSessionRes = await request(app)
        .get('/api/auth/session')
        .set('Cookie', registerSessionCookie);

      expect(registerSessionRes.status).toBe(200);
      expect(registerSessionRes.body.authenticated).toBe(true);
      expect(registerSessionRes.body.session.userId).toBe(res.body.user.id);
    });

    it('should return 409 COMPANY_ALREADY_EXISTS on duplicate CNPJ', async () => {
      if (!hasDb) return;

      const payload1 = validRegistrationPayload();
      // Ensure specific CNPJ
      payload1.company.cnpj = '11222333000100';

      const res1 = await request(app)
        .post('/api/auth/register-company')
        .send(payload1);

      expect(res1.status).toBe(200);

      const payload2 = validRegistrationPayload();
      payload2.company.cnpj = '11222333000100'; // duplicate CNPJ

      const res2 = await request(app)
        .post('/api/auth/register-company')
        .send(payload2);

      expect(res2.status).toBe(409);
      expect(res2.body.ok).toBe(false);
      expect(res2.body.error.code).toBe('COMPANY_ALREADY_EXISTS');
    });

    it('should reject an invalid CNPJ when it is supplied', async () => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({
          admin: validAdmin(),
          company: { cnpj: '123' }
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('INVALID_INPUT');
      expect(res.body.error.message).toContain('14 dígitos');
    });

    it.each([
      {
        label: 'nomeCompleto',
        admin: {
          email: 'required-name@example.com',
          senha: 'N7!rKq4#vM2zLw9',
          confirmarSenha: 'N7!rKq4#vM2zLw9'
        }
      },
      {
        label: 'email',
        admin: {
          nomeCompleto: 'Administrador Principal',
          senha: 'N7!rKq4#vM2zLw9',
          confirmarSenha: 'N7!rKq4#vM2zLw9'
        }
      },
      {
        label: 'senha',
        admin: {
          nomeCompleto: 'Administrador Principal',
          email: 'required-password@example.com',
          confirmarSenha: 'N7!rKq4#vM2zLw9'
        }
      },
      {
        label: 'confirmarSenha',
        admin: {
          nomeCompleto: 'Administrador Principal',
          email: 'required-confirmation@example.com',
          senha: 'N7!rKq4#vM2zLw9'
        }
      }
    ])('should reject signup without required admin field $label', async ({ admin }) => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({ admin });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('INVALID_INPUT');
    });

    it.each([
      { company: { email: 'invalid-email' }, message: 'E-mail da empresa' },
      { company: { endereco: { uf: 'S' } }, message: 'UF do endereço' },
      { company: { regimeTributario: 'regime_desconhecido' }, message: 'Regime tributário' }
    ])('should validate optional company data when supplied', async ({ company, message }) => {
      if (!hasDb) return;

      const res = await request(app)
        .post('/api/auth/register-company')
        .send({ admin: validAdmin(), company });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('INVALID_INPUT');
      expect(res.body.error.message).toContain(message);
    });

    it('should return 400 on weak password (fails policy)', async () => {
      if (!hasDb) return;

      const payload = validRegistrationPayload();
      payload.admin.senha = '123'; // too short / weak
      payload.admin.confirmarSenha = '123';

      const res = await request(app)
        .post('/api/auth/register-company')
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_INPUT');
    });

    it('should return 400 on unmatched confirmation password', async () => {
      if (!hasDb) return;

      const payload = validRegistrationPayload();
      payload.admin.confirmarSenha = 'differentPassword123!';

      const res = await request(app)
        .post('/api/auth/register-company')
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_INPUT');
      expect(res.body.error.message).toContain('iguais');
    });

    it('should return 400 on invalid email formatting', async () => {
      if (!hasDb) return;

      const payload = validRegistrationPayload();
      payload.admin.email = 'not-an-email';

      const res = await request(app)
        .post('/api/auth/register-company')
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.error.code).toBe('INVALID_INPUT');
    });
  });
});
