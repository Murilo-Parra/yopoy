import { describe, it, expect } from 'vitest';
import { AuthPermission } from '../types';

describe('Backend Auth Permissions Types', () => {
  it('should recognize admin user permissions as valid types', () => {
    const viewPerm: AuthPermission = 'admin:users:view';
    const managePerm: AuthPermission = 'admin:users:manage';
    const createPerm: AuthPermission = 'admin:users:create';
    const updatePerm: AuthPermission = 'admin:users:update';
    const updatePermsPerm: AuthPermission = 'admin:users:permissions:update';
    const resetPerm: AuthPermission = 'admin:users:password:reset';
    const auditPerm: AuthPermission = 'admin:audit:view';

    expect(viewPerm).toBe('admin:users:view');
    expect(managePerm).toBe('admin:users:manage');
    expect(createPerm).toBe('admin:users:create');
    expect(updatePerm).toBe('admin:users:update');
    expect(updatePermsPerm).toBe('admin:users:permissions:update');
    expect(resetPerm).toBe('admin:users:password:reset');
    expect(auditPerm).toBe('admin:audit:view');
  });
});
