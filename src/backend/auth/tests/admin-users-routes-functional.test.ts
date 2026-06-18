import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { registerAdminUsersRoutes } from '../registerAdminUsersRoutes';
import { AdminUsersHttpHandlers, AdminUsersOperations } from '../AdminUsersHttpHandlers';
import { AuthenticatedSession, SafeAuthUser } from '../../../application/auth/types';

describe('Admin Users Routes Functional Tests', () => {
  let app: express.Express;
  let mockOps: AdminUsersOperations;
  let mockSession: AuthenticatedSession;

  const validCompanyId = '11111111-1111-4111-8111-111111111111';
  const otherCompanyId = '33333333-3333-4333-8333-333333333333';
  const validUserId = '22222222-2222-4222-8222-222222222222';
  const validToken = 'valid-token-123';

  beforeEach(() => {
    mockOps = {
      validateSession: vi.fn(),
      listUsers: vi.fn(),
      updateStatus: vi.fn(),
      updatePermissions: vi.fn(),
      updateRole: vi.fn(),
      resetPassword: vi.fn(),
    };

    mockSession = {
      userId: 'admin-id',
      email: 'admin@yopoy.com',
      companyId: validCompanyId,
      role: 'admin',
      permissions: ['admin:users:view', 'admin:users:manage']
    };

    app = express();
    app.use(express.json());
    const handlers = new AdminUsersHttpHandlers(mockOps);
    app.use('/api/admin', registerAdminUsersRoutes(handlers));
  });

  const getHeaders = (companyId: string | null, cookie: string | null) => {
    const headers: Record<string, string> = {};
    if (companyId) headers['x-yopoy-company-id'] = companyId;
    if (cookie) headers['Cookie'] = cookie;
    return headers;
  };

  describe('GET /api/admin/users', () => {
    it('1. GET /api/admin/users sem cookie deve retornar 401', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(validCompanyId, null));
      expect(res.status).toBe(401);
    });

    it('2. GET /api/admin/users sem x-yopoy-company-id deve retornar 401', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(null, `yopoy_session=${validToken}`));
      expect(res.status).toBe(401);
    });

    it('3. GET /api/admin/users com cookie, mas sessão inválida, deve retornar 401', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: false });
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      expect(res.status).toBe(401);
    });

    it('4. GET /api/admin/users com sessão válida, mas session.companyId diferente do header, deve retornar 403', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({
        authenticated: true,
        session: { ...mockSession, companyId: otherCompanyId }
      });
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      expect(res.status).toBe(403);
    });

    it('5. GET /api/admin/users com sessão válida e empresa correta deve retornar 200', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.listUsers).mockResolvedValueOnce([]);
      
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      expect(res.status).toBe(200);
      expect(res.body.users).toEqual([]);
    });

    it('6. A resposta da listagem não pode vazar passwordHash, sessionTokenHash, rawSessionToken', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      
      const mockUserWithSecrets: SafeAuthUser & { passwordHash?: string, sessionTokenHash?: string, rawSessionToken?: string } = {
        id: validUserId,
        email: 'test@example.com',
        companyId: validCompanyId,
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: null,
        passwordHash: 'secret-hash',
        sessionTokenHash: 'secret-token-hash',
        rawSessionToken: 'secret-raw-token'
      };

      vi.mocked(mockOps.listUsers).mockResolvedValueOnce([mockUserWithSecrets]);
      
      const res = await request(app)
        .get('/api/admin/users')
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(200);
      const user = res.body.users[0];
      expect(user.id).toBe(validUserId);
      expect(user.passwordHash).toBeUndefined();
      expect(user.sessionTokenHash).toBeUndefined();
      expect(user.rawSessionToken).toBeUndefined();
    });
  });

  describe('PATCH /api/admin/users/:userId/status', () => {
    it('7. PATCH status com ID inválido deve retornar erro de input', async () => {
      const res = await request(app)
        .patch('/api/admin/users/invalid-id/status')
        .send({ active: false })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      expect(res.status).toBe(400);
      expect(mockOps.updateStatus).not.toHaveBeenCalled();
    });

    it('8. PATCH status com active inválido deve retornar erro de input', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/status`)
        .send({ active: 'not-a-boolean' })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      expect(res.status).toBe(400);
      expect(mockOps.updateStatus).not.toHaveBeenCalled();
    });

    it('9. PATCH status com payload válido deve chamar updateStatus com argumentos corretos e retornar 200', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updateStatus).mockResolvedValueOnce(undefined);

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/status`)
        .send({ active: false })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(200);
      expect(mockOps.updateStatus).toHaveBeenCalledWith(validCompanyId, mockSession, validUserId, false);
    });

    it('9.1. PATCH status enviando companyId via body não deve utilizá-lo', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updateStatus).mockResolvedValueOnce(undefined);

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/status`)
        .send({ active: false, companyId: otherCompanyId })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(200);
      // Deve usar o companyId do HEADER, não do body
      expect(mockOps.updateStatus).toHaveBeenCalledWith(validCompanyId, mockSession, validUserId, false);
    });
  });

  describe('PATCH /api/admin/users/:userId/permissions', () => {
    it('10. PATCH permissions deve rejeitar permissões fora da allowlist', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/permissions`)
        .send({ permissions: ['admin:users:view', 'invalid:permission'] })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(400);
      expect(mockOps.updatePermissions).not.toHaveBeenCalled();
    });

    it('11. PATCH permissions deve aceitar permissões aprovadas', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updatePermissions).mockResolvedValueOnce(undefined);

      const approvedPermissions = [
        'admin:users:view',
        'admin:users:manage',
        'admin:users:create',
        'admin:users:update',
        'admin:users:permissions:update',
        'admin:users:password:reset',
        'admin:audit:view'
      ];

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/permissions`)
        .send({ permissions: approvedPermissions })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(200);
      expect(mockOps.updatePermissions).toHaveBeenCalledWith(validCompanyId, mockSession, validUserId, approvedPermissions);
    });
  });

  describe('PATCH /api/admin/users/:userId/role', () => {
    it('12. PATCH role deve rejeitar role inválida', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/role`)
        .send({ role: 'super-admin-invalid' })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(400);
      expect(mockOps.updateRole).not.toHaveBeenCalled();
    });

    it('13. PATCH role deve aceitar roles aprovadas', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updateRole).mockResolvedValueOnce(undefined);

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/role`)
        .send({ role: 'accountant' })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(200);
      expect(mockOps.updateRole).toHaveBeenCalledWith(validCompanyId, mockSession, validUserId, 'accountant');
    });
  });

  describe('POST /api/admin/users/:userId/password-reset', () => {
    it('14. POST password-reset deve rejeitar senha/hash ausente ou inválido', async () => {
      const res = await request(app)
        .post(`/api/admin/users/${validUserId}/password-reset`)
        .send({ newPasswordHash: '   ' }) // blank space
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(400);

      const res2 = await request(app)
        .post(`/api/admin/users/${validUserId}/password-reset`)
        .send({}) // missing
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res2.status).toBe(400);
      expect(mockOps.resetPassword).not.toHaveBeenCalled();
    });
  });

  describe('Erros mapeados', () => {
    it('15. Quando uma operação lançar código AUTH_PERMISSION_DENIED, deve retornar 403', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updateStatus).mockRejectedValueOnce({ code: 'AUTH_PERMISSION_DENIED' });

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/status`)
        .send({ active: true })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(403);
    });

    it('16. Quando uma operação lançar ADMIN_USER_NOT_FOUND, deve retornar 404', async () => {
      vi.mocked(mockOps.validateSession).mockResolvedValueOnce({ authenticated: true, session: mockSession });
      vi.mocked(mockOps.updateStatus).mockRejectedValueOnce({ code: 'ADMIN_USER_NOT_FOUND' });

      const res = await request(app)
        .patch(`/api/admin/users/${validUserId}/status`)
        .send({ active: true })
        .set(getHeaders(validCompanyId, `yopoy_session=${validToken}`));
      
      expect(res.status).toBe(404);
    });
    
    it('17. Nenhuma rota deve aceitar companyId por query', async () => {
      const res = await request(app)
        .get(`/api/admin/users?companyId=${validCompanyId}`)
        .set(getHeaders(null, `yopoy_session=${validToken}`)); 
      
      expect(res.status).toBe(401);
    });

    it('18. Nenhuma rota deve depender de Authorization: Bearer', async () => {
      const res = await request(app)
        .get(`/api/admin/users`)
        .set('x-yopoy-company-id', validCompanyId)
        .set('Authorization', `Bearer ${validToken}`); 
      
      expect(res.status).toBe(401);
    });
  });
});
