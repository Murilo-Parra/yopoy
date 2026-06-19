import type { AuthPermission } from '../../application/auth/types';

export interface AuthRequirePermissionPayload {
  companyId: string;
  permission: AuthPermission;
}

const VALID_AUTH_PERMISSIONS = [
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
  'admin:users:view',
  'admin:users:manage',
  'admin:users:create',
  'admin:users:update',
  'admin:users:permissions:update',
  'admin:users:password:reset',
  'admin:audit:view',
] as const;

function isAuthPermission(value: unknown): value is AuthPermission {
  return typeof value === 'string' && (VALID_AUTH_PERMISSIONS as readonly string[]).includes(value);
}

export function resolveAuthRequirePermissionPayload(
  body: unknown,
): AuthRequirePermissionPayload | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined;
  }

  const record = body as Record<string, unknown>;
  const companyId = record.companyId;
  const permission = record.permission;

  if (typeof companyId !== 'string' || companyId.trim() === '') {
    return undefined;
  }

  if (!isAuthPermission(permission)) {
    return undefined;
  }

  return {
    companyId: companyId.trim(),
    permission,
  };
}
