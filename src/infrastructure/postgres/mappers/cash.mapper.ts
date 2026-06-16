import { CashSession, CashMovement } from '../../../domain/entities';

export class CashMapper {
  static toPersistence(domain: CashSession) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      opened_at: domain.opened_at,
      closed_at: domain.closed_at || null,
      initial_balance: domain.initial_balance,
      final_balance: domain.final_balance || null,
      status: domain.status,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      created_by: domain.created_by,
      updated_by: domain.updated_by
    };
  }

  static movementToPersistence(domain: CashMovement, companyId: string) {
    return {
      id: domain.id,
      company_id: companyId,
      session_id: domain.session_id,
      type: domain.type,
      amount: domain.amount,
      notes: domain.notes || null,
      created_at: domain.created_at,
      created_by: domain.created_by
    };
  }
}
