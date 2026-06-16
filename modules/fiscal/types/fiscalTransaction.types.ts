export interface FiscalTransactionAuditSnapshot {
  timestamp: string;
  queriesExecuted: number;
}

export interface FiscalRollbackTestResult<T> {
  success: boolean;
  operationName: string;
  result?: T;
  error?: string;
  auditSnapshot?: FiscalTransactionAuditSnapshot;
}

export interface FiscalDmlOperationResult {
  rowCount: number;
  operation: string;
  table: string;
}
