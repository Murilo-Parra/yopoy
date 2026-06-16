import { describe, it, expect } from 'vitest';
import { getPermissionsForRole, roleHasPermission, assertRoleHasPermission } from '../permissions/permissions';

describe('Permissions Matrix Unit Tests', () => {
  it('owner deve ter todas as permissoes', () => {
    const ownerPermissions = getPermissionsForRole('owner');
    expect(ownerPermissions.length).toBe(14); // All listed permissions
    expect(roleHasPermission('owner', 'company:update')).toBe(true);
    expect(roleHasPermission('owner', 'settings:update')).toBe(true);
    expect(roleHasPermission('owner', 'audit:read')).toBe(true);
  });

  it('employee nao pode acessar audit:read', () => {
    expect(roleHasPermission('employee', 'audit:read')).toBe(false);
    expect(() => assertRoleHasPermission('employee', 'audit:read')).toThrow('Access Denied');
  });

  it('accountant deve ter leitura financeira/fiscal/contabil', () => {
    expect(roleHasPermission('accountant', 'sales:read')).toBe(true);
    expect(roleHasPermission('accountant', 'payments:read')).toBe(true);
    expect(roleHasPermission('accountant', 'audit:read')).toBe(true);
    expect(roleHasPermission('accountant', 'users:create')).toBe(false); // Should not have operational write controls
  });

  it('support nao pode alterar settings', () => {
    expect(roleHasPermission('support', 'settings:update')).toBe(false);
    expect(() => assertRoleHasPermission('support', 'settings:update')).toThrow('Access Denied');
  });
});
