import { CreateSmartCaptureDraftRequest, ConvertSmartCaptureDraftToSaleRequest } from '../dtos/smartCapture.dto';
import { ValidationResult } from '../shared';

export function validateCreateSmartCaptureDraftRequest(data: any): ValidationResult<CreateSmartCaptureDraftRequest> {
  if (!data || typeof data.rawText !== 'string' || data.rawText.trim() === '') {
    return { success: false, errors: { rawText: 'rawText is required and must be a non-empty string' } };
  }
  return { success: true, data: { rawText: data.rawText, attachmentId: data.attachmentId } };
}

export function validateConvertDraftToSaleRequest(data: any): ValidationResult<ConvertSmartCaptureDraftToSaleRequest> {
  if (!data || typeof data.totalAmount !== 'number' || data.totalAmount <= 0) {
    return { success: false, errors: { totalAmount: 'totalAmount must be a positive number' } };
  }
  return { success: true, data: { totalAmount: data.totalAmount } };
}
