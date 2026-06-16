import { AuditLogRepository } from '../application/repositories/AuditLogRepository';
import { CashSessionRepository } from '../application/repositories/CashSessionRepository';
import { CompanyRepository } from '../application/repositories/CompanyRepository';
import { CustomerRepository } from '../application/repositories/CustomerRepository';
import { DraftInvoiceRepository } from '../application/repositories/DraftInvoiceRepository';
import { ExpenseRepository } from '../application/repositories/ExpenseRepository';
import { LedgerRepository } from '../application/repositories/LedgerRepository';
import { PaymentRepository } from '../application/repositories/PaymentRepository';
import { PendingItemRepository } from '../application/repositories/PendingItemRepository';
import { ProductRepository } from '../application/repositories/ProductRepository';
import { SaleRepository } from '../application/repositories/SaleRepository';
import { SmartCaptureRepository } from '../application/repositories/SmartCaptureRepository';

import { SalesHandlers } from '../backend/handlers/sales.handlers';
import { PaymentsHandlers } from '../backend/handlers/payments.handlers';
import { CashHandlers } from '../backend/handlers/cash.handlers';
import { DraftInvoicesHandlers } from '../backend/handlers/draftInvoices.handlers';
import { SmartCaptureHandlers } from '../backend/handlers/smartCapture.handlers';
import { AppUseCases } from './createUseCases';

export type PersistenceMode = 'in-memory' | 'postgres' | 'postgres-dry-run' | 'postgres-local-sandbox';

export type AppRepositories = {
  auditRepo: AuditLogRepository;
  cashRepo: CashSessionRepository;
  companyRepo: CompanyRepository;
  customerRepo: CustomerRepository;
  draftInvoiceRepo: DraftInvoiceRepository;
  expenseRepo: ExpenseRepository;
  ledgerRepo: LedgerRepository;
  paymentRepo: PaymentRepository;
  pendingRepo: PendingItemRepository;
  productRepo: ProductRepository;
  saleRepo: SaleRepository;
  smartCaptureRepo: SmartCaptureRepository;
};

export type AppHandlers = {
  sales: SalesHandlers;
  payments: PaymentsHandlers;
  cash: CashHandlers;
  draftInvoices: DraftInvoicesHandlers;
  smartCapture: SmartCaptureHandlers;
};

export type AppContainer = {
  mode: PersistenceMode;
  repositories: AppRepositories;
  useCases: AppUseCases;
  handlers: AppHandlers;
};

