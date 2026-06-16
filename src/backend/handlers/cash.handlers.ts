import { RequestContext, ApiResponse, apiSuccess, mapApplicationErrorToApi, handleUnknownError } from '../shared';
import { CashSessionResponse } from '../dtos/cash.dto';
import { validateOpenCashSessionRequest, validateCloseCashSessionRequest } from '../validators/cash.validator';
import { mapCashSessionToResponse } from '../mappers/cash.mapper';
import { AppUseCases } from '../../composition/createUseCases';
import { AppRepositories } from '../../composition/types';

export class CashHandlers {
  constructor(
    private useCases: AppUseCases,
    private repos: AppRepositories
  ) {}

  async handleOpenSession(context: RequestContext, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<CashSessionResponse> }> {
    try {
      const validation = validateOpenCashSessionRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.openCashSession({
        companyId: context.companyId,
        userId: context.userId,
        initialBalance: validation.data.initialBalance
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);

      return { statusCode: 201, body: apiSuccess(mapCashSessionToResponse(result.data), context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleCloseSession(context: RequestContext, sessionId: string, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    try {
      const validation = validateCloseCashSessionRequest(rawRequest);
      if (!validation.success) {
        return { statusCode: 400, body: { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid body', details: validation.errors }, requestId: context.requestId } };
      }

      const result = await this.useCases.closeCashSession({
        companyId: context.companyId,
        userId: context.userId,
        sessionId,
        finalBalance: validation.data.finalBalance
      });

      if (!result.success) return mapApplicationErrorToApi(result.error, context.requestId);

      return { statusCode: 200, body: apiSuccess(undefined, context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleGetCurrentSession(context: RequestContext): Promise<{ statusCode: number, body: ApiResponse<CashSessionResponse | null> }> {
    try {
      const session = await this.repos.cashRepo.findActiveSession(context.companyId);
      return { statusCode: 200, body: apiSuccess(session ? mapCashSessionToResponse(session) : null, context.requestId) };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }
}
