import { DraftInvoice } from '../../domain/entities';
import { DraftInvoiceRepository } from '../../application/repositories/DraftInvoiceRepository';

export class InMemoryDraftInvoiceRepository implements DraftInvoiceRepository {
  private drafts: DraftInvoice[] = [];

  async create(draft: DraftInvoice): Promise<DraftInvoice> {
    this.drafts.push(draft);
    return draft;
  }

  async update(draft: DraftInvoice): Promise<DraftInvoice> {
    const index = this.drafts.findIndex(d => d.id === draft.id && d.company_id === draft.company_id);
    if (index >= 0) {
      this.drafts[index] = draft;
    }
    return draft;
  }

  async findById(companyId: string, id: string): Promise<DraftInvoice | null> {
    return this.drafts.find(d => d.id === id && d.company_id === companyId) || null;
  }
}
