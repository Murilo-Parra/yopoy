import { AuditLog } from '../../../domain/entities';

export class AuditMapper {
  static toPersistence(domain: AuditLog) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      entity_type: domain.entity_type,
      entity_id: domain.entity_id,
      action: domain.action,
      previous_state: domain.previous_state ? JSON.parse(domain.previous_state) : null,
      current_state: JSON.parse(domain.current_state),
      user_id: domain.user_id,
      created_at: domain.created_at
    };
  }
}
