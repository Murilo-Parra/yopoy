export enum FiscalSandboxIntegrityStatus {
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  BLOCKED_BY_RISK = 'BLOCKED_BY_RISK',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalSandboxQualityScore {
  score: number;
  status: FiscalSandboxIntegrityStatus | string;
  totalSnapshots: number;
  validSnapshots: number;
  incompleteSnapshots: number;
  duplicateCandidates: number;
  expiredSnapshots: number;
  retainedSnapshots: number;
  reviewedSnapshots: number;
  blockedSnapshots: number;
  sandboxOnly: true;
  productionWrite: false;
  readOnly: true;
  simulationOnly: true;
  activationBlocked: true;
}

export interface FiscalSandboxIntegrityIssue {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  route?: string;
  source?: string;
  count: number;
  description: string;
  recommendation: string;
  blockerForRealActivation: boolean;
}

export interface FiscalSandboxIntegrityReport {
  generatedAt: string;
  summary: any;
  qualityScore: FiscalSandboxQualityScore;
  issues: FiscalSandboxIntegrityIssue[];
  risks: any[];
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
