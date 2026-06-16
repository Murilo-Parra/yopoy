export enum FiscalWriteMode {
  DISABLED = "DISABLED",
  DRY_RUN = "DRY_RUN",
  ENABLED = "ENABLED",
  ROLLBACK_ONLY = "ROLLBACK_ONLY",
  SANDBOX_PERSISTENCE = "SANDBOX_PERSISTENCE"
}

export enum FiscalWriteGuardDecision {
  ALLOW = "ALLOW",
  DENY = "DENY",
  DRY_RUN = "DRY_RUN",
  ROLLBACK_ONLY = "ROLLBACK_ONLY",
  SANDBOX_PERSISTENCE = "SANDBOX_PERSISTENCE"
}

export enum FiscalWriteOperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  CANCEL = "CANCEL",
  SYNC = "SYNC",
  SIGN = "SIGN",
  TRANSMIT = "TRANSMIT",
  SAVE = "SAVE"
}

export interface FiscalWriteDryRunResult {
  success: boolean;
  simulatedId: string;
  message: string;
  operation: FiscalWriteOperationType;
  timestamp: string;
  payload: any;
}

export interface FiscalWriteBlockedResult {
  success: false;
  reason: string;
  operation: FiscalWriteOperationType;
  timestamp: string;
}

export interface FiscalWriteGuardContext {
  companyId: string;
  userId?: string;
  operation: FiscalWriteOperationType;
  documentType?: string;
  source: string;
  dryRun?: boolean;
  sandbox?: boolean;
}
