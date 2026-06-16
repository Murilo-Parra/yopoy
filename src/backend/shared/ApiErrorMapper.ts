import { ApplicationError } from '../../application/shared';
import { apiError, ApiErrorResponse } from './ApiResponse';

export function mapApplicationErrorToApi(error: ApplicationError, requestId?: string): { statusCode: number, body: ApiErrorResponse } {
  let statusCode = 400; // Default Bad Request

  switch (error.code) {
    case 'VALIDATION_ERROR':
      statusCode = 400;
      break;
    case 'NOT_FOUND':
      statusCode = 404;
      break;
    case 'UNAUTHORIZED_COMPANY_ACCESS':
    case 'FISCAL_ACTION_BLOCKED':
      statusCode = 403;
      break;
    case 'INVALID_STATUS_TRANSITION':
    case 'ALREADY_LINKED':
    case 'NOT_LINKED':
    case 'CASH_SESSION_NOT_OPEN':
    case 'CASH_SESSION_ALREADY_OPEN':
    case 'SALE_ALREADY_CANCELLED':
    case 'PAYMENT_ALREADY_LINKED':
    case 'DRAFT_NOT_REVIEWED':
      statusCode = 409;
      break;
    default:
      statusCode = 500;
  }

  return {
    statusCode,
    body: apiError(error.code, error.message, undefined, requestId)
  };
}

export function handleUnknownError(error: unknown, requestId?: string): { statusCode: number, body: ApiErrorResponse } {
  console.error('Unhandled error:', error);
  return {
    statusCode: 500,
    body: apiError('INTERNAL_SERVER_ERROR', 'An unexpected error occurred', undefined, requestId)
  };
}
