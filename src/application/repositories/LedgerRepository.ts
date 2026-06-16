import { LedgerEntry } from '../../domain/entities';

export interface LedgerRepository {
  create(entry: LedgerEntry): Promise<LedgerEntry>;
  listByCompany(companyId: string): Promise<LedgerEntry[]>;
}
