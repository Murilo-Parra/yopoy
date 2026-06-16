import { RequestContext, ApiResponse, apiSuccess, mapApplicationErrorToApi, handleUnknownError } from '../shared';
import { CreateSaleRequest, AddSaleItemRequest, SaleResponse } from '../dtos/sales.dto';
import { validateAddSaleItemRequest } from '../validators/sales.validator';
import { mapSaleToResponse } from '../mappers/sales.mapper';
import { AppUseCases } from '../../composition/createUseCases';
import { AppRepositories } from '../../composition/types';

export class SalesHandlers {
  constructor(
    private useCases: AppUseCases,
    private repos: AppRepositories
  ) {}

  async handleCreateSale(context: RequestContext, request: CreateSaleRequest): Promise<{ statusCode: number, body: ApiResponse<SaleResponse> }> {
    try {
      const result = await this.useCases.createSale({
        companyId: context.companyId,
        userId: context.userId,
        customerId: request.customerId
      });

      if (!result.success) {
        return mapApplicationErrorToApi(result.error, context.requestId);
      }

      return {
        statusCode: 201,
        body: apiSuccess(mapSaleToResponse(result.data), context.requestId)
      };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleAddSaleItem(context: RequestContext, saleId: string, rawRequest: any): Promise<{ statusCode: number, body: ApiResponse<SaleResponse> }> {
    try {
      const validation = validateAddSaleItemRequest(rawRequest);
      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid request body',
              details: validation.errors
            },
            requestId: context.requestId
          }
        };
      }

      const request = validation.data;
      const result = await this.useCases.addSaleItem({
        companyId: context.companyId,
        userId: context.userId,
        saleId,
        productId: request.productId,
        serviceId: request.serviceId,
        qty: request.qty,
        unitValue: request.unitValue
      });

      if (!result.success) {
        return mapApplicationErrorToApi(result.error, context.requestId);
      }

      return {
        statusCode: 200,
        body: apiSuccess(mapSaleToResponse(result.data), context.requestId)
      };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleMarkAsPendingPayment(context: RequestContext, saleId: string): Promise<{ statusCode: number, body: ApiResponse<void> }> {
    try {
      const result = await this.useCases.markSaleAsPendingPayment({ 
        companyId: context.companyId, 
        userId: context.userId, 
        saleId 
      });

      if (!result.success) {
        return mapApplicationErrorToApi(result.error, context.requestId);
      }

      return {
        statusCode: 200,
        body: apiSuccess(undefined, context.requestId)
      };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }

  async handleGetSale(context: RequestContext, saleId: string): Promise<{ statusCode: number, body: ApiResponse<SaleResponse> }> {
    try {
      const sale = await this.repos.saleRepo.findById(context.companyId, saleId);
      if (!sale) {
        return {
          statusCode: 404,
          body: { success: false, error: { code: 'NOT_FOUND', message: 'Sale not found' }, requestId: context.requestId }
        };
      }
      return {
        statusCode: 200,
        body: apiSuccess(mapSaleToResponse(sale), context.requestId)
      };
    } catch (e) {
      return handleUnknownError(e, context.requestId);
    }
  }
}
