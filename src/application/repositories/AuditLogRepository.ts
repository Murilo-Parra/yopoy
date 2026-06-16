import { AuditLog } from '../../domain/entities';

export interface AuditLogRepository {
  create(log: AuditLog): Promise<AuditLog>;
  listByCompany(companyId: string): Promise<AuditLog[]>;
}
