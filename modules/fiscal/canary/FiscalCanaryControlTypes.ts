export enum FiscalCanaryControlStatus {
  INACTIVE = "INACTIVE",
  SIMULATION_APPROVED = "SIMULATION_APPROVED",
  BLOCKED = "BLOCKED",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED"
}

export enum FiscalCanaryControlMode {
  SIMULATION_ONLY = "SIMULATION_ONLY",
  APPROVAL_ONLY = "APPROVAL_ONLY",
  BLOCKED = "BLOCKED"
}

export interface FiscalCanaryAllowlistEntry {
  id?: string;
  companyId?: string;
  route: string;
  operation: string;
  riskLevel: string; // FiscalCanaryRiskLevel but using string to avoid circular if any
  status: FiscalCanaryControlStatus;
  reason: string;
  expiresAt?: string;
  createdBy?: string;
  createdAt: string;
}

export interface FiscalCanaryApprovalRequest {
  companyId?: string;
  route: string;
  operation: string;
  requestedMode: string;
  justification: string;
  simulationOnly: boolean;
}

export interface FiscalCanaryApprovalResult {
  approved: boolean;
  status: FiscalCanaryControlStatus;
  simulationOnly: boolean;
  activationBlocked: boolean;
  reason: string;
  blockers: string[];
  warnings: string[];
  auditId?: string;
}

export enum FiscalCanaryControlRecordAction {
  ALLOWLIST_SIMULATED = "ALLOWLIST_SIMULATED",
  APPROVAL_SIMULATED = "APPROVAL_SIMULATED",
  BLOCK_SIMULATED = "BLOCK_SIMULATED",
  REVOKE_SIMULATED = "REVOKE_SIMULATED"
}

export interface FiscalCanaryControlRecord {
  id: string;
  companyId?: string;
  userId?: string;
  action: string;
  route: string;
  operation: string;
  riskLevel: string;
  status: FiscalCanaryControlStatus;
  mode: FiscalCanaryControlMode;
  simulationOnly: boolean;
  activationBlocked: boolean;
  reason: string;
  metadata: any;
  createdBy?: string;
  createdAt: string;
  expiresAt?: string;
  revokedAt?: string;
}

export interface FiscalCanaryControlPersistenceResult {
  success: boolean;
  persisted: boolean;
  recordId?: string;
  skippedReason?: string;
}

export interface FiscalCanaryControlFilters {
  companyId?: string;
  route?: string;
  operation?: string;
  status?: string;
  mode?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}
