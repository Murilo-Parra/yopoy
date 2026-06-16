import { AppRepositories } from './types';
import { recordAuditLog as recordAuditLogFn } from '../application/use-cases/audit/recordAuditLog';
import { closeCashSession as closeCashSessionFn } from '../application/use-cases/cash/closeCashSession';
import { openCashSession as openCashSessionFn } from '../application/use-cases/cash/openCashSession';
import { createDraftInvoiceFromSale as createDraftInvoiceFromSaleFn } from '../application/use-cases/draft-invoices/createDraftInvoiceFromSale';
import { createExpense as createExpenseFn } from '../application/use-cases/expenses/createExpense';
import { createLedgerEntry as createLedgerEntryFn } from '../application/use-cases/ledger/createLedgerEntry';
import { linkPaymentToSale as linkPaymentToSaleFn } from '../application/use-cases/payments/linkPaymentToSale';
import { registerPayment as registerPaymentFn } from '../application/use-cases/payments/registerPayment';
import { unlinkPaymentFromSale as unlinkPaymentFromSaleFn } from '../application/use-cases/payments/unlinkPaymentFromSale';
import { createPendingItem as createPendingItemFn } from '../application/use-cases/pending/createPendingItem';
import { resolvePendingItem as resolvePendingItemFn } from '../application/use-cases/pending/resolvePendingItem';
import { addSaleItem as addSaleItemFn } from '../application/use-cases/sales/addSaleItem';
import { createSale as createSaleFn } from '../application/use-cases/sales/createSale';
import { markSaleAsPendingPayment as markSaleAsPendingPaymentFn } from '../application/use-cases/sales/markSaleAsPendingPayment';
import { convertSmartCaptureDraftToSale as convertSmartCaptureDraftToSaleFn } from '../application/use-cases/smart-capture/convertSmartCaptureDraftToSale';
import { createSmartCaptureDraft as createSmartCaptureDraftFn } from '../application/use-cases/smart-capture/createSmartCaptureDraft';
import { reviewSmartCaptureDraft as reviewSmartCaptureDraftFn } from '../application/use-cases/smart-capture/reviewSmartCaptureDraft';

export function createUseCases(repos: AppRepositories) {
  return {
    recordAuditLog: (input: Parameters<typeof recordAuditLogFn>[0]) => recordAuditLogFn(input, repos.auditRepo),
    closeCashSession: (input: Parameters<typeof closeCashSessionFn>[0]) => closeCashSessionFn(input, repos.cashRepo, repos.auditRepo),
    openCashSession: (input: Parameters<typeof openCashSessionFn>[0]) => openCashSessionFn(input, repos.cashRepo, repos.auditRepo),
    createDraftInvoiceFromSale: (input: Parameters<typeof createDraftInvoiceFromSaleFn>[0]) => createDraftInvoiceFromSaleFn(input, repos.draftInvoiceRepo, repos.saleRepo, repos.auditRepo),
    createExpense: (input: Parameters<typeof createExpenseFn>[0]) => createExpenseFn(input, repos.expenseRepo, repos.ledgerRepo, repos.auditRepo),
    createLedgerEntry: (input: Parameters<typeof createLedgerEntryFn>[0]) => createLedgerEntryFn(input, repos.ledgerRepo),
    linkPaymentToSale: (input: Parameters<typeof linkPaymentToSaleFn>[0]) => linkPaymentToSaleFn(input, repos.paymentRepo, repos.saleRepo, repos.auditRepo, repos.ledgerRepo, repos.pendingRepo),
    registerPayment: (input: Parameters<typeof registerPaymentFn>[0]) => registerPaymentFn(input, repos.paymentRepo, repos.auditRepo, repos.pendingRepo),
    unlinkPaymentFromSale: (input: Parameters<typeof unlinkPaymentFromSaleFn>[0]) => unlinkPaymentFromSaleFn(input, repos.paymentRepo, repos.auditRepo, repos.pendingRepo),
    createPendingItem: (input: Parameters<typeof createPendingItemFn>[0]) => createPendingItemFn(input, repos.pendingRepo, repos.auditRepo),
    resolvePendingItem: (input: Parameters<typeof resolvePendingItemFn>[0]) => resolvePendingItemFn(input, repos.pendingRepo, repos.auditRepo),
    addSaleItem: (input: Parameters<typeof addSaleItemFn>[0]) => addSaleItemFn(input, repos.saleRepo, repos.auditRepo),
    createSale: (input: Parameters<typeof createSaleFn>[0]) => createSaleFn(input, repos.saleRepo, repos.auditRepo),
    markSaleAsPendingPayment: (input: Parameters<typeof markSaleAsPendingPaymentFn>[0]) => markSaleAsPendingPaymentFn(input, repos.saleRepo, repos.pendingRepo, repos.auditRepo),
    convertSmartCaptureDraftToSale: (input: Parameters<typeof convertSmartCaptureDraftToSaleFn>[0]) => convertSmartCaptureDraftToSaleFn(input, repos.smartCaptureRepo, repos.saleRepo, repos.auditRepo),
    createSmartCaptureDraft: (input: Parameters<typeof createSmartCaptureDraftFn>[0]) => createSmartCaptureDraftFn(input, repos.smartCaptureRepo, repos.auditRepo),
    reviewSmartCaptureDraft: (input: Parameters<typeof reviewSmartCaptureDraftFn>[0]) => reviewSmartCaptureDraftFn(input, repos.smartCaptureRepo, repos.auditRepo)
  };
}

export type AppUseCases = ReturnType<typeof createUseCases>;
