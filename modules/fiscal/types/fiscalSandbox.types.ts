export type FiscalSandboxSource = "fiscal-v2-sandbox";

export interface FiscalSandboxWriteContext {
  companyId: string;
  userId?: string;
  sandbox: boolean;
  source: FiscalSandboxSource | string;
  operation: string;
  documentType?: string;
  cleanupRequired: boolean;
}

export interface FiscalSandboxWriteResult {
  success: boolean;
  sandbox: boolean;
  persisted: boolean;
  cleanupRequired: boolean;
  createdIds: string[];
  message: string;
}

export interface FiscalSandboxCleanupResult {
  success: boolean;
  deletedCount: number;
  deletedIds: string[];
}
