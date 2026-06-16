export interface FiscalCanaryCockpitOverview {
  generatedAt: string;
  simulationOnly: boolean;
  activationBlocked: boolean;
  globalReadinessScore: number;
  globalReadinessClass: string;
  totalShadowRuns: number;
  totalDivergences: number;
  totalBlockers: number;
  totalHighSeverity: number;
  totalControlRecords: number;
  totalAllowlistSimulations: number;
  totalApprovalSimulations: number;
  totalBlockedCandidates: number;
  recommendedStatus: string;
}

export interface FiscalCanaryCockpitRouteStatus {
  route: string;
  operation: string;
  riskLevel: string;
  readinessScore: number;
  evidenceStatus: string;
  controlStatus: string;
  blockerCount: number;
  highCount: number;
  sampleSize: number;
  recommendation: string;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalCanaryCockpitBlocker {
  route: string;
  operation: string;
  severity: string;
  reason: string;
  source: string;
  createdAt?: string;
}

export interface FiscalCanaryCockpitRecommendation {
  status: string;
  message: string;
  nextAction: string;
  allowedFuturePhase: string;
  blockers: string[];
  warnings: string[];
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalCanaryFinalReviewSimulation {
  approvedForRealCanary: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  decision: string;
  blockers: string[];
  warnings: string[];
  requiredBeforeActivation: string[];
}
