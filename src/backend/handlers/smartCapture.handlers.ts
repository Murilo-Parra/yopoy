import { RequestContext, ApiResponse, apiSuccess, mapApplicationErrorToApi, handleUnknownError } from '../shared';
import { SmartCaptureDraftResponse } from '../dtos/smartCapture.dto';
import { SaleResponse } from '../dtos/sales.dto';
import { validateCreateSmartCaptureDraftRequest, validateConvertDraftToSaleRequest } from '../validators/smartCapture.validator';
import { mapSmartCaptureDraftToResponse } from '../mappers/smartCapture.mapper';
import { mapSaleToResponse } from '../mappers/sales.mapper';
import { AppUseCases } from '../../composition/createUseCases';
import { AppRepositories } from '../../composition/types';

export class SmartCaptureHandlers {
  constructor(
    private useCases: AppUseCases,
    private repos: AppRepositories
  ) {}

  async handleCreateDraft(context: RequestContext, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<SmartCaptureDraftResponse> }> {
    try {
      const validation = validateCreateSmartCaptureDraftRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.createSmartCaptureDraft({
        companyId: context.companyId,
        userId: context.userId,
        rawText: validation.data.rawText,
        attachmentId: validation.data.attachmentId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 201, body: apiSuccess(mapSmartCaptureDraftToResponse(result.data), context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleReviewDraft(context: RequestContext, draftId: string): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    try {
      const result = await this.useCases.reviewSmartCaptureDraft({
        companyId: context.companyId,
        userId: context.userId,
        draftId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 200, body: apiSuccess(undefined, context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleConvertToSale(context: RequestContext, draftId: string, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<SaleResponse> }> {
    try {
      const validation = validateConvertDraftToSaleRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.convertSmartCaptureDraftToSale({
        companyId: context.companyId,
        userId: context.userId,
        draftId,
        totalAmount: validation.data.totalAmount
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 201, body: apiSuccess(mapSaleToResponse(result.data), context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }
}

