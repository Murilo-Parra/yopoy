import { CreateDraftInvoiceFromSaleRequest } from '../dtos/draftInvoices.dto';
import { ValidationResult } from '../shared';

export function validateCreateDraftInvoiceRequest(data: any): ValidationResult<CreateDraftInvoiceFromSaleRequest> {
  if (!data || typeof data.saleId !== 'string') {
    return { success: false, errors: { saleId: 'saleId is required' } };
  }
  return { success: true, data: { saleId: data.saleId } };
}
