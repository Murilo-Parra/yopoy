export enum FiscalSandboxReviewDecision {
  REVIEWED = 'REVIEWED',
  RETAIN_FOR_ANALYSIS = 'RETAIN_FOR_ANALYSIS',
  ELIGIBLE_FOR_CLEANUP = 'ELIGIBLE_FOR_CLEANUP',
  BLOCKED_FOR_SAFETY = 'BLOCKED_FOR_SAFETY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalSandboxRetentionStatus {
  RETAINED = 'RETAINED',
  CLEANUP_ELIGIBLE = 'CLEANUP_ELIGIBLE',
  CLEANED = 'CLEANED',
  EXPIRED = 'EXPIRED',
  BLOCKED = 'BLOCKED'
}

export interface FiscalSandboxReviewResult {
  success: boolean;
  recordId: string;
  decision: FiscalSandboxReviewDecision | string;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  warnings?: string[];
  blockers?: string[];
}

export interface FiscalSandboxCleanupPreview {
  generatedAt: string;
  totalCandidates: number;
  candidateIds: string[];
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  executeRequired: false;
}

export interface FiscalSandboxReviewReport {
  generatedAt: string;
  totalSnapshots: number;
  totalReviewed: number;
  totalRetained: number;
  totalCleanupEligible: number;
  totalCleaned: number;
  totalBlocked: number;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
}
