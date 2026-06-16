import { OpenCashSessionRequest, CloseCashSessionRequest } from '../dtos/cash.dto';
import { ValidationResult } from '../shared';

export function validateOpenCashSessionRequest(data: any): ValidationResult<OpenCashSessionRequest> {
  if (!data || typeof data.initialBalance !== 'number' || data.initialBalance < 0) {
    return { success: false, errors: { initialBalance: 'Valid non-negative initialBalance is required' } };
  }
  return { success: true, data: { initialBalance: data.initialBalance } };
}

export function validateCloseCashSessionRequest(data: any): ValidationResult<CloseCashSessionRequest> {
  if (!data || typeof data.finalBalance !== 'number' || data.finalBalance < 0) {
    return { success: false, errors: { finalBalance: 'Valid non-negative finalBalance is required' } };
  }
  return { success: true, data: { finalBalance: data.finalBalance } };
}
