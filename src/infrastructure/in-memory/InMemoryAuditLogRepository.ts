import { AuditLog } from '../../domain/entities';
import { AuditLogRepository } from '../../application/repositories/AuditLogRepository';

export class InMemoryAuditLogRepository implements AuditLogRepository {
  private logs: AuditLog[] = [];

  async create(log: AuditLog): Promise<AuditLog> {
    this.logs.push(log);
    return log;
  }

  async listByCompany(companyId: string): Promise<AuditLog[]> {
    return this.logs.filter(l => l.company_id === companyId);
  }
}
