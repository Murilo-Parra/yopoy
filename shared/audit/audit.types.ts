export enum AuditLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SECURITY = 'SECURITY'
}

export enum AuditCategory {
  SECURITY = 'SECURITY',
  DATABASE = 'DATABASE',
  FISCAL = 'FISCAL',
  AUTH = 'AUTH',
  TENANT = 'TENANT',
  SYSTEM = 'SYSTEM',
  BUSINESS = 'BUSINESS'
}

export interface AuditMetadata {
  companyId?: string | null;
  userId?: string | null;
  ip?: string;
  userAgent?: string;
  timestamp?: string;
  stackTrace?: string;
  module?: string;
  [key: string]: any;
}

export interface IAuditEvent {
  id: string;
  level: AuditLevel;
  category: AuditCategory;
  action: string;
  message: string;
  details?: any;
  metadata?: AuditMetadata;
  timestamp: string;
}
