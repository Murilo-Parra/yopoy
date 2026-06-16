import { DraftInvoice } from '../../domain/entities';
import { DraftInvoiceResponse } from '../dtos/draftInvoices.dto';

export function mapDraftInvoiceToResponse(draft: DraftInvoice): DraftInvoiceResponse {
  return {
    id: draft.id,
    saleId: draft.sale_id,
    status: draft.status,
    simulatedTaxes: draft.simulated_taxes,
    createdAt: draft.created_at.toISOString(),
  };
}
