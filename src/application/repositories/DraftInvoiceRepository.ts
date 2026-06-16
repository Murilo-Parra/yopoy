import { DraftInvoice } from '../../domain/entities';

export interface DraftInvoiceRepository {
  create(draft: DraftInvoice): Promise<DraftInvoice>;
  update(draft: DraftInvoice): Promise<DraftInvoice>;
  findById(companyId: string, id: string): Promise<DraftInvoice | null>;
}
