import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Express, Request } from 'express';
import { AdminUsersHttpHandlers, AdminUsersOperations } from '../AdminUsersHttpHandlers';
import { AuthPermissionDeniedError, AdminUserNotFoundError } from '../../../application/auth/AuthErrors';
import { AuthenticatedSession } from '../../../application/auth/types';

type RequestWithCookies = Request & {
  cookies: Record<string, string>;
};

describe('AdminUsersHttpHandlers', () => {
  let app: Express;
  let ops: AdminUsersOperations;

  const validCompanyId = 'd290f1ee-6c54-4b01-90e6-d701748f0851';
  const otherCompanyId = 'd290f1ee-6c54-4b01-90e6-d701748f0853';
  const validUserId = 'd290f1ee-6c54-4b01-90e6-d701748f0852';

  const validSession: AuthenticatedSession = {
    companyId: validCompanyId,
    userId: validUserId,
    email: 'admin@yopoy.com',
    role: 'admin',
    permissions: ['admin:users:view']
  };

  beforeEach(() => {
    ops = {
      validateSession: vi.fn().mockResolvedValue({
        authenticated: true,
        session: validSession
      }),
      listUsers: vi.fn(),
      updateStatus: vi.fn(),
      updatePermissions: vi.fn(),
      updateRole: vi.fn(),
      resetPassword: vi.fn()
    };

    const handlers = new AdminUsersHttpHandlers(ops);

    app = express();
    app.use(express.json());

    app.use((req, _res, next) => {
      const requestWithCookies = req as RequestWithCookies;
      requestWithCookies.cookies = {};

      const cookieHeader = req.headers.cookie;

      if (cookieHeader) {
        cookieHeader.split(';').forEach((cookie) => {
          const [name, ...valueParts] = cookie.split('=');
          requestWithCookies.cookies[name.trim()] = valueParts.join('=').trim();
        });
      }

      next();
    });

    app.get('/api/admin/users', handlers.handleListUsers);
    app.patch('/api/admin/users/:userId/status', handlers.handleUpdateStatus);
    app.patch('/api/admin/users/:userId/permissions', handlers.handleUpdatePermissions);
    app.patch('/api/admin/users/:userId/role', handlers.handleUpdateRole);
    app.post('/api/admin/users/:userId/password-reset', handlers.handleResetPassword);
  });

  it('GET /api/admin/users retorna 401 sem cookie', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', validCompanyId);

    expect(res.status).toBe(401);
  });

  it('GET /api/admin/users retorna 403 quando tenant do header difere da sessão', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', otherCompanyId)
      .set('Cookie', ['yopoy_session=abc']);

    expect(res.status).toBe(403);
  });

  it('GET /api/admin/users chama listUsers e retorna users seguros', async () => {
    ops.listUsers = vi.fn().mockResolvedValue([
      { id: validUserId, email: 'user@yopoy.com' }
    ]);

    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc']);

    expect(res.status).toBe(200);
    expect(res.body.users).toHaveLength(1);
    expect(ops.listUsers).toHaveBeenCalledWith(validCompanyId, validSession);
  });

  it('GET /api/admin/users nunca retorna passwordHash, sessionTokenHash ou rawSessionToken', async () => {
    ops.listUsers = vi.fn().mockResolvedValue([
      {
        id: validUserId,
        email: 'user@yopoy.com',
        passwordHash: 'secret',
        sessionTokenHash: 'secret-token',
        rawSessionToken: 'raw-secret'
      }
    ]);

    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc']);

    expect(res.status).toBe(200);
    expect(res.body.users[0].passwordHash).toBeUndefined();
    expect(res.body.users[0].sessionTokenHash).toBeUndefined();
    expect(res.body.users[0].rawSessionToken).toBeUndefined();
    expect(JSON.stringify(res.body)).not.toContain('passwordHash');
    expect(JSON.stringify(res.body)).not.toContain('sessionTokenHash');
    expect(JSON.stringify(res.body)).not.toContain('rawSessionToken');
  });

  it('PATCH /status exige active boolean', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/status`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ active: 'not_boolean' });

    expect(res.status).toBe(400);
  });

  it('PATCH /status chama updateStatus com targetUserId', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/status`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ active: false });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(ops.updateStatus).toHaveBeenCalledWith(
      validCompanyId,
      validSession,
      validUserId,
      false
    );
  });

  it('PATCH /permissions exige array', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/permissions`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ permissions: 'admin:audit:view' });

    expect(res.status).toBe(400);
  });

  it('PATCH /permissions rejeita permissão inválida', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/permissions`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ permissions: ['admin:fake:permission'] });

    expect(res.status).toBe(400);
  });

  it('PATCH /permissions chama updatePermissions com permissões válidas', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/permissions`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ permissions: ['admin:audit:view'] });

    expect(res.status).toBe(200);
    expect(ops.updatePermissions).toHaveBeenCalledWith(
      validCompanyId,
      validSession,
      validUserId,
      ['admin:audit:view']
    );
  });

  it('PATCH /role rejeita role inválida', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/role`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ role: 'superadmin_hacker' });

    expect(res.status).toBe(400);
    expect(ops.updateRole).not.toHaveBeenCalled();
  });

  it('PATCH /role chama updateRole com role válida', async () => {
    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/role`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ role: 'employee' });

    expect(res.status).toBe(200);
    expect(ops.updateRole).toHaveBeenCalledWith(
      validCompanyId,
      validSession,
      validUserId,
      'employee'
    );
  });

  it('POST /password-reset exige newPasswordHash', async () => {
    const res = await request(app)
      .post(`/api/admin/users/${validUserId}/password-reset`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({});

    expect(res.status).toBe(400);
  });

  it('POST /password-reset não retorna senha nem hash', async () => {
    const res = await request(app)
      .post(`/api/admin/users/${validUserId}/password-reset`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ newPasswordHash: 'already-hashed-password' });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.password).toBeUndefined();
    expect(res.body.newPasswordHash).toBeUndefined();
    expect(ops.resetPassword).toHaveBeenCalledWith(
      validCompanyId,
      validSession,
      validUserId,
      'already-hashed-password'
    );
  });

  it('Permission denied retorna 403', async () => {
    ops.listUsers = vi.fn().mockRejectedValue(new AuthPermissionDeniedError());

    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc']);

    expect(res.status).toBe(403);
  });

  it('Not found retorna 404', async () => {
    ops.updateStatus = vi.fn().mockRejectedValue(new AdminUserNotFoundError());

    const res = await request(app)
      .patch(`/api/admin/users/${validUserId}/status`)
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc'])
      .send({ active: false });

    expect(res.status).toBe(404);
  });

  it('Erro inesperado retorna 500 genérico', async () => {
    ops.listUsers = vi.fn().mockRejectedValue(new Error('Unknown DB Error'));

    const res = await request(app)
      .get('/api/admin/users')
      .set('x-yopoy-company-id', validCompanyId)
      .set('Cookie', ['yopoy_session=abc']);

    expect(res.status).toBe(500);
  });
});
