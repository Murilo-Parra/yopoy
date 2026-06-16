export enum FiscalSandboxEvidenceStatus {
  EMPTY = 'EMPTY',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
  SANDBOX_CERTIFIED_WITH_WARNINGS = 'SANDBOX_CERTIFIED_WITH_WARNINGS',
  BLOCKED_BY_RISK = 'BLOCKED_BY_RISK',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalSandboxEvidenceSummary {
  generatedAt: string;
  companyId: string;
  totalSnapshots: number;
  totalReviewed: number;
  totalRetained: number;
  totalCleanupEligible: number;
  totalBlocked: number;
  totalExpired: number;
  qualityScore: number;
  status: string;
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalSandboxEvidenceChecklistItem {
  id: string;
  name: string;
  passed: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence: string;
  requiredBeforeActivation: boolean;
}

export interface FiscalSandboxEvidenceCertification {
  generatedAt: string;
  companyId: string;
  status: FiscalSandboxEvidenceStatus | string;
  summary: any;
  checklist: FiscalSandboxEvidenceChecklistItem[];
  risks: any[];
  certificationMessage: string;
  certificationHash: string;
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalSandboxEvidenceFinalReview {
  go: false;
  noGo: true;
  reason: string;
  requiredBeforeGo: string[];
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
}
