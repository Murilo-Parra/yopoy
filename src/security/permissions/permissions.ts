import { AuthRole, AuthPermission } from '../../application/auth/types';

const permissionsByRole: Record<AuthRole, AuthPermission[]> = {
  owner: [
    'company:read',
    'company:update',
    'users:read',
    'users:create',
    'users:update',
    'users:disable',
    'customers:read',
    'customers:create',
    'sales:read',
    'sales:create',
    'payments:read',
    'inventory:read',
    'audit:read',
    'settings:update',
  ],
  admin: [
    'company:read',
    'users:read',
    'users:create',
    'users:update',
    'users:disable',
    'customers:read',
    'customers:create',
    'sales:read',
    'sales:create',
    'payments:read',
    'inventory:read',
    'audit:read',
  ],
  employee: [
    'customers:read',
    'customers:create',
    'sales:read',
    'sales:create',
    'payments:read',
    'inventory:read',
  ],
  accountant: [
    'company:read',
    'customers:read',
    'sales:read',
    'payments:read',
    'audit:read',
  ],
  support: [
    'company:read',
    'users:read',
    'customers:read',
    'sales:read',
    'inventory:read',
  ],
};

export function getPermissionsForRole(role: AuthRole): AuthPermission[] {
  return permissionsByRole[role] || [];
}

export function roleHasPermission(role: AuthRole, permission: AuthPermission): boolean {
  const list = getPermissionsForRole(role);
  return list.includes(permission);
}

export function assertRoleHasPermission(role: AuthRole, permission: AuthPermission): void {
  if (!roleHasPermission(role, permission)) {
    throw new Error(`Access Denied: Role '${role}' lacks required permission '${permission}'`);
  }
}
