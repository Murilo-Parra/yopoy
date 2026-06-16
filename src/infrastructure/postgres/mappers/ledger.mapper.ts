import { LedgerEntry } from '../../../domain/entities';

export class LedgerMapper {
  static toPersistence(domain: LedgerEntry) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      account: domain.account,
      debit: domain.debit,
      credit: domain.credit,
      reference_id: domain.reference_id || null,
      status: domain.status,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      created_by: domain.created_by,
      updated_by: domain.updated_by
    };
  }
}
