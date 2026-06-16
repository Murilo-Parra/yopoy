import { AppContainer } from '../composition/types';
import { RequestContext } from '../backend/shared/RequestContext';
import { ApiResponse } from '../backend/shared/ApiResponse';
import { 
  CreateSaleRequest, 
  AddSaleItemRequest, 
  SaleResponse 
} from '../backend/dtos/sales.dto';
import { 
  RegisterPaymentRequest, 
  LinkPaymentToSaleRequest, 
  PaymentResponse 
} from '../backend/dtos/payments.dto';
import { 
  CashSessionResponse 
} from '../backend/dtos/cash.dto';
import { 
  SmartCaptureDraftResponse 
} from '../backend/dtos/smartCapture.dto';
import {
  DraftInvoiceResponse
} from '../backend/dtos/draftInvoices.dto';

export class YopoyFrontendClient {
  constructor(
    private container: AppContainer,
    private context: RequestContext
  ) {}

  // ==========================================
  // SALES
  // ==========================================
  async createSale(request: CreateSaleRequest): Promise<ApiResponse<SaleResponse>> {
    const { body } = await this.container.handlers.sales.handleCreateSale(this.context, request);
    return body;
  }

  async addSaleItem(saleId: string, request: AddSaleItemRequest): Promise<ApiResponse<SaleResponse>> {
    const { body } = await this.container.handlers.sales.handleAddSaleItem(this.context, saleId, request);
    return body;
  }

  async markSaleAsPendingPayment(saleId: string): Promise<ApiResponse<void>> {
    const { body } = await this.container.handlers.sales.handleMarkAsPendingPayment(this.context, saleId);
    return body;
  }

  async getSale(saleId: string): Promise<ApiResponse<SaleResponse>> {
    const { body } = await this.container.handlers.sales.handleGetSale(this.context, saleId);
    return body;
  }

  // ==========================================
  // PAYMENTS
  // ==========================================
  async registerPayment(request: RegisterPaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    const { body } = await this.container.handlers.payments.handleRegisterPayment(this.context, request);
    return body;
  }

  async linkPaymentToSale(paymentId: string, request: LinkPaymentToSaleRequest): Promise<ApiResponse<void>> {
    const { body } = await this.container.handlers.payments.handleLinkToSale(this.context, paymentId, request);
    return body;
  }

  async unlinkPaymentFromSale(paymentId: string, request: { saleId: string }): Promise<ApiResponse<void>> {
    const { body } = await this.container.handlers.payments.handleUnlinkFromSale(this.context, paymentId, request);
    return body;
  }

  // ==========================================
  // CASH SESSION
  // ==========================================
  async openCashSession(initialBalance: number): Promise<ApiResponse<CashSessionResponse>> {
    const { body } = await this.container.handlers.cash.handleOpenSession(this.context, { initialBalance });
    return body;
  }

  async closeCashSession(sessionId: string, finalBalance: number): Promise<ApiResponse<void>> {
    const { body } = await this.container.handlers.cash.handleCloseSession(this.context, sessionId, { finalBalance });
    return body;
  }

  async getCurrentCashSession(): Promise<ApiResponse<CashSessionResponse | null>> {
    const { body } = await this.container.handlers.cash.handleGetCurrentSession(this.context);
    return body;
  }

  // ==========================================
  // SMART CAPTURE
  // ==========================================
  async createSmartCaptureDraft(rawText: string): Promise<ApiResponse<SmartCaptureDraftResponse>> {
    const { body } = await this.container.handlers.smartCapture.handleCreateDraft(this.context, { rawText });
    return body;
  }

  async reviewSmartCaptureDraft(draftId: string): Promise<ApiResponse<void>> {
    const { body } = await this.container.handlers.smartCapture.handleReviewDraft(this.context, draftId);
    return body;
  }

  async convertSmartCaptureDraftToSale(draftId: string, totalAmount: number): Promise<ApiResponse<SaleResponse>> {
    const { body } = await this.container.handlers.smartCapture.handleConvertToSale(this.context, draftId, { totalAmount });
    return body;
  }

  // ==========================================
  // DRAFT INVOICES (Fiscal Placeholder)
  // ==========================================
  async createDraftInvoiceFromSale(saleId: string): Promise<ApiResponse<DraftInvoiceResponse>> {
    const { body } = await this.container.handlers.draftInvoices.handleCreateDraftFromSale(this.context, { saleId });
    return body;
  }

  // ==========================================
  // LEGACY FISCAL BLOCKED
  // ==========================================
  async emitirNFeRealBlocked(): Promise<ApiResponse<any>> {
    return {
      success: false,
      error: {
        code: 'FISCAL_ACTION_BLOCKED',
        message: 'A emissão fiscal real está bloqueada neste ambiente.',
        details: null
      },
      requestId: this.context.requestId
    };
  }
}
