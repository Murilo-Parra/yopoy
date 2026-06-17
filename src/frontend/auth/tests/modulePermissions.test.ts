import { describe, it, expect } from 'vitest';
import { MODULE_PERMISSIONS, SystemPermission } from '../modulePermissions';

describe('Module Permissions Tests', () => {
  it('should expose admin users management permissions correctly', () => {
    expect(MODULE_PERMISSIONS.admin.usersView).toBe('admin:users:view');
    expect(MODULE_PERMISSIONS.admin.usersManage).toBe('admin:users:manage');
    expect(MODULE_PERMISSIONS.admin.usersCreate).toBe('admin:users:create');
    expect(MODULE_PERMISSIONS.admin.usersUpdate).toBe('admin:users:update');
    expect(MODULE_PERMISSIONS.admin.usersPermissionsUpdate).toBe('admin:users:permissions:update');
    expect(MODULE_PERMISSIONS.admin.usersPasswordReset).toBe('admin:users:password:reset');
    expect(MODULE_PERMISSIONS.admin.auditView).toBe('admin:audit:view');
  });

  it('should be typed as SystemPermission', () => {
    const perm: SystemPermission = MODULE_PERMISSIONS.admin.usersView;
    expect(perm).toBeDefined();
  });
});
