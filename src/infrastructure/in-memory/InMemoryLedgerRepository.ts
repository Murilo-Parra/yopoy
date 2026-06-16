import { LedgerEntry } from '../../domain/entities';
import { LedgerRepository } from '../../application/repositories/LedgerRepository';

export class InMemoryLedgerRepository implements LedgerRepository {
  private entries: LedgerEntry[] = [];

  async create(entry: LedgerEntry): Promise<LedgerEntry> {
    this.entries.push(entry);
    return entry;
  }

  async listByCompany(companyId: string): Promise<LedgerEntry[]> {
    return this.entries.filter(e => e.company_id === companyId);
  }
}
