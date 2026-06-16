export enum FiscalCanaryEvidenceStatus {
  SUFFICIENT = "SUFFICIENT",
  INSUFFICIENT = "INSUFFICIENT",
  DEGRADED = "DEGRADED",
  BLOCKED = "BLOCKED",
  UNKNOWN = "UNKNOWN"
}

export interface FiscalCanaryEvidenceSummary {
  controlRecordId?: string;
  companyId?: string;
  route: string;
  operation: string;
  sampleSize: number;
  matchedCount: number;
  divergedCount: number;
  failedCount: number;
  blockerCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  readinessScore: number;
  evidenceStatus: FiscalCanaryEvidenceStatus;
  simulationOnly: boolean;
  activationBlocked: boolean;
  generatedAt: string;
}

export interface FiscalCanaryCorrelationResult {
  correlated: boolean;
  controlRecordId?: string;
  evidenceStatus: FiscalCanaryEvidenceStatus;
  recommendation: string;
  blockers: string[];
  warnings: string[];
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalCanarySuspensionSimulation {
  shouldSuspend: boolean;
  reason: string;
  affectedRecords: string[];
  simulationOnly: boolean;
  activationBlocked: boolean;
}
