export type AuthRole = 'owner' | 'admin' | 'employee' | 'accountant' | 'support';

export type AuthPermission =
  | 'company:read'
  | 'company:update'
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:disable'
  | 'customers:read'
  | 'customers:create'
  | 'sales:read'
  | 'sales:create'
  | 'payments:read'
  | 'inventory:read'
  | 'audit:read'
  | 'settings:update'
  | 'admin:users:view'
  | 'admin:users:manage'
  | 'admin:users:create'
  | 'admin:users:update'
  | 'admin:users:permissions:update'
  | 'admin:users:password:reset'
  | 'admin:audit:view';

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  companyId: string | null; // historical compatibility
  createdAt: Date;
  updatedAt: Date;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  lastLoginAt: Date | null;
}

export interface SafeAuthUser {
  id: string;
  email: string;
  companyId: string | null;
  createdAt: Date;
  updatedAt: Date;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  lastLoginAt: Date | null;
}

export interface AuthSession {
  id: string;
  userId: string;
  sessionTokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  lastTouchedAt: Date;
  revokedAt: Date | null;
}

export interface SafeAuthSession {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  lastTouchedAt: Date;
}

export interface Membership {
  id: string;
  userId: string;
  companyId: string;
  role: AuthRole;
  permissions?: AuthPermission[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedSession {
  userId: string;
  email: string;
  companyId: string;
  role: AuthRole;
  permissions: AuthPermission[];
}

export type AuthAuditEventType =
  | 'company_registered'
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'session_expired'
  | 'session_revoked'
  | 'password_changed'
  | 'user_locked'
  | 'permission_denied';

export interface AuthAuditEvent {
  id: string;
  companyId: string | null;
  userId: string | null;
  eventType: AuthAuditEventType;
  description: string;
  ipAddress: string | null;
  userAgent: string | null;
  timestamp: Date;
}
