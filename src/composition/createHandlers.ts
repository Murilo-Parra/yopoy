import { AppRepositories } from './types';
import { AppUseCases } from './createUseCases';
import { SalesHandlers } from '../backend/handlers/sales.handlers';
import { PaymentsHandlers } from '../backend/handlers/payments.handlers';
import { CashHandlers } from '../backend/handlers/cash.handlers';
import { DraftInvoicesHandlers } from '../backend/handlers/draftInvoices.handlers';
import { SmartCaptureHandlers } from '../backend/handlers/smartCapture.handlers';

export function createHandlers(useCases: AppUseCases, repos: AppRepositories) {
  return {
    sales: new SalesHandlers(useCases, repos),
    payments: new PaymentsHandlers(useCases, repos),
    cash: new CashHandlers(useCases, repos),
    draftInvoices: new DraftInvoicesHandlers(useCases, repos),
    smartCapture: new SmartCaptureHandlers(useCases, repos)
  };
}
