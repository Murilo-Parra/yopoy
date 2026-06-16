import { AuthAuditRepository } from '../contracts/AuthAuditRepository';
import { AuthAuditEvent } from '../types';

export class InMemoryAuthAuditRepository implements AuthAuditRepository {
  public events: AuthAuditEvent[] = [];

  async recordAuthEvent(event: Omit<AuthAuditEvent, 'id' | 'timestamp'>): Promise<AuthAuditEvent> {
    const auditEvent: AuthAuditEvent = {
      id: `evt_${Math.random().toString(36).substring(2, 9)}`,
      companyId: event.companyId,
      userId: event.userId,
      eventType: event.eventType,
      description: event.description,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      timestamp: new Date(),
    };
    this.events.push(auditEvent);
    return { ...auditEvent };
  }

  async listAuthEventsByCompany(companyId: string): Promise<AuthAuditEvent[]> {
    return this.events.filter((e) => e.companyId === companyId).map((e) => ({ ...e }));
  }
}
