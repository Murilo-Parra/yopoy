import { AppRepositories } from '../../composition/types';
import { DryRunSqlExecutor } from './executor/DryRunSqlExecutor';

// Implemented Reopsitories
import { PostgresSaleRepository } from './repositories/PostgresSaleRepository';
import { PostgresPaymentRepository } from './repositories/PostgresPaymentRepository';
import { PostgresCashSessionRepository } from './repositories/PostgresCashSessionRepository';
import { PostgresExpenseRepository } from './repositories/PostgresExpenseRepository';
import { PostgresLedgerRepository } from './repositories/PostgresLedgerRepository';
import { PostgresAuditLogRepository } from './repositories/PostgresAuditLogRepository';

// Dummy repos to complete type
import { InMemoryCompanyRepository } from '../in-memory/InMemoryCompanyRepository';
import { InMemoryCustomerRepository } from '../in-memory/InMemoryCustomerRepository';
import { InMemoryDraftInvoiceRepository } from '../in-memory/InMemoryDraftInvoiceRepository';
import { InMemoryPendingItemRepository } from '../in-memory/InMemoryPendingItemRepository';
import { InMemoryProductRepository } from '../in-memory/InMemoryProductRepository';
import { InMemorySmartCaptureRepository } from '../in-memory/InMemorySmartCaptureRepository';

export function createPostgresDryRunRepositories(executor: DryRunSqlExecutor): AppRepositories {
  // Return the mixed container favoring Postgres Dry-Run for implemented ones
  return {
    saleRepo: new PostgresSaleRepository(executor),
    paymentRepo: new PostgresPaymentRepository(executor),
    cashRepo: new PostgresCashSessionRepository(executor),
    expenseRepo: new PostgresExpenseRepository(executor),
    ledgerRepo: new PostgresLedgerRepository(executor),
    auditRepo: new PostgresAuditLogRepository(executor),
    
    companyRepo: new InMemoryCompanyRepository(),
    customerRepo: new InMemoryCustomerRepository(),
    draftInvoiceRepo: new InMemoryDraftInvoiceRepository(),
    pendingRepo: new InMemoryPendingItemRepository(),
    productRepo: new InMemoryProductRepository(),
    smartCaptureRepo: new InMemorySmartCaptureRepository(),
  };
}
