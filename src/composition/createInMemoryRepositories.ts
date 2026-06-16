import { InMemoryAuditLogRepository } from '../infrastructure/in-memory/InMemoryAuditLogRepository';
import { InMemoryCashSessionRepository } from '../infrastructure/in-memory/InMemoryCashSessionRepository';
import { InMemoryCompanyRepository } from '../infrastructure/in-memory/InMemoryCompanyRepository';
import { InMemoryCustomerRepository } from '../infrastructure/in-memory/InMemoryCustomerRepository';
import { InMemoryDraftInvoiceRepository } from '../infrastructure/in-memory/InMemoryDraftInvoiceRepository';
import { InMemoryExpenseRepository } from '../infrastructure/in-memory/InMemoryExpenseRepository';
import { InMemoryLedgerRepository } from '../infrastructure/in-memory/InMemoryLedgerRepository';
import { InMemoryPaymentRepository } from '../infrastructure/in-memory/InMemoryPaymentRepository';
import { InMemoryPendingItemRepository } from '../infrastructure/in-memory/InMemoryPendingItemRepository';
import { InMemoryProductRepository } from '../infrastructure/in-memory/InMemoryProductRepository';
import { InMemorySaleRepository } from '../infrastructure/in-memory/InMemorySaleRepository';
import { InMemorySmartCaptureRepository } from '../infrastructure/in-memory/InMemorySmartCaptureRepository';
import { AppRepositories } from './types';

export function createInMemoryRepositories(): AppRepositories {
  return {
    auditRepo: new InMemoryAuditLogRepository(),
    cashRepo: new InMemoryCashSessionRepository(),
    companyRepo: new InMemoryCompanyRepository(),
    customerRepo: new InMemoryCustomerRepository(),
    draftInvoiceRepo: new InMemoryDraftInvoiceRepository(),
    expenseRepo: new InMemoryExpenseRepository(),
    ledgerRepo: new InMemoryLedgerRepository(),
    paymentRepo: new InMemoryPaymentRepository(),
    pendingRepo: new InMemoryPendingItemRepository(),
    productRepo: new InMemoryProductRepository(),
    saleRepo: new InMemorySaleRepository(),
    smartCaptureRepo: new InMemorySmartCaptureRepository()
  };
}
