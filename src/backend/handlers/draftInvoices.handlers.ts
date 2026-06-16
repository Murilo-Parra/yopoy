import { RequestContext, ApiResponse, apiSuccess, mapApplicationErrorToApi, handleUnknownError, apiError } from '../shared';
import { DraftInvoiceResponse } from '../dtos/draftInvoices.dto';
import { validateCreateDraftInvoiceRequest } from '../validators/draftInvoices.validator';
import { mapDraftInvoiceToResponse } from '../mappers/draftInvoices.mapper';
import { AppUseCases } from '../../composition/createUseCases';
import { AppRepositories } from '../../composition/types';

export class DraftInvoicesHandlers {
  constructor(
    private useCases: AppUseCases,
    private repos: AppRepositories
  ) {}

  async handleCreateDraftFromSale(context: RequestContext, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<DraftInvoiceResponse> }> {
    try {
      const validation = validateCreateDraftInvoiceRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.createDraftInvoiceFromSale({
        companyId: context.companyId,
        userId: context.userId,
        saleId: validation.data.saleId
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);
      return { statusCode: 201, body: apiSuccess(mapDraftInvoiceToResponse(result.data), context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleAttemptRealFiscalEmission(context: RequestContext, draftId: string): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    // This explicitly blocks the SEFAZ real call as mandated by the prompt constraints
    return {
      statusCode: 403,
      body: apiError('FISCAL_ACTION_BLOCKED', 'Fiscal actions are blocked in this environment', undefined, context.requestId)
    };
  }
}

