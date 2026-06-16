import { RequestContext, ApiResponse, apiSuccess, mapApplicationErrorToApi, handleUnknownError } from '../shared';
import { RegisterPaymentRequest, LinkPaymentToSaleRequest, UnlinkPaymentFromSaleRequest, PaymentResponse } from '../dtos/payments.dto';
import { validateRegisterPaymentRequest } from '../validators/payments.validator';
import { mapPaymentToResponse } from '../mappers/payments.mapper';
import { AppUseCases } from '../../composition/createUseCases';
import { AppRepositories } from '../../composition/types';

export class PaymentsHandlers {
  constructor(
    private useCases: AppUseCases,
    private repos: AppRepositories
  ) {}

  async handleRegisterPayment(context: RequestContext, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<PaymentResponse> }> {
    try {
      const validation = validateRegisterPaymentRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.registerPayment({
        companyId: context.companyId,
        userId: context.userId,
        amount: validation.data.amount,
        method: validation.data.method,
        saleId: validation.data.saleId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);

      return { statusCode: 201, body: apiSuccess(mapPaymentToResponse(result.data), context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleLinkToSale(context: RequestContext, paymentId: string, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    try {
      if (!rawRequest || !rawRequest.saleId) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'saleId is required' } } };
      }

      const result = await this.useCases.linkPaymentToSale({
        companyId: context.companyId,
        userId: context.userId,
        paymentId,
        saleId: rawRequest.saleId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 200, body: apiSuccess(undefined, context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleUnlinkFromSale(context: RequestContext, paymentId: string, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    try {
      if (!rawRequest || !rawRequest.saleId) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'saleId is required' } } };
      }

      const result = await this.useCases.unlinkPaymentFromSale({
        companyId: context.companyId,
        userId: context.userId,
        paymentId,
        saleId: rawRequest.saleId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 200, body: apiSuccess(undefined, context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }
}

