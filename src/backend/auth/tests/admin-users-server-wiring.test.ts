import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { registerAdminUsersRoutes } from '../registerAdminUsersRoutes';
import { AdminUsersHttpHandlers } from '../AdminUsersHttpHandlers';
import { AdminUsersOperations } from '../AdminUsersHttpHandlers';

describe('Admin Users Server Wiring (Composition)', () => {
  it('registers correct routes on the router and exposes them on /api/admin', async () => {
    const mockOps: AdminUsersOperations = {
      validateSession: vi.fn(),
      listUsers: vi.fn(),
      updateStatus: vi.fn(),
      updatePermissions: vi.fn(),
      updateRole: vi.fn(),
      resetPassword: vi.fn(),
    };

    const mockHandlers = new AdminUsersHttpHandlers(mockOps);

    const app = express();
    app.use(express.json());
    app.use('/api/admin', registerAdminUsersRoutes(mockHandlers));

    // We only test that the routes exist and do not return 404.
    // They should return 401 Unauthorized since we are not passing headers.
    
    const getRes = await request(app).get('/api/admin/users');
    expect(getRes.status).not.toBe(404);

    const patchStatusRes = await request(app).patch('/api/admin/users/123/status');
    expect(patchStatusRes.status).not.toBe(404);

    const patchPermsRes = await request(app).patch('/api/admin/users/123/permissions');
    expect(patchPermsRes.status).not.toBe(404);

    const patchRoleRes = await request(app).patch('/api/admin/users/123/role');
    expect(patchRoleRes.status).not.toBe(404);

    const postResetRes = await request(app).post('/api/admin/users/123/password-reset');
    expect(postResetRes.status).not.toBe(404);
  });
});
