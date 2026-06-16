import { AuthAuditEvent, AuthAuditEventType } from '../types';

export interface AuthAuditRepository {
  recordAuthEvent(event: Omit<AuthAuditEvent, 'id' | 'timestamp'>): Promise<AuthAuditEvent>;
  listAuthEventsByCompany(companyId: string): Promise<AuthAuditEvent[]>;
}
