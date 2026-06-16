export enum FiscalShadowReplayMetricsStatus {
  EMPTY = "EMPTY",
  COLLECTING_MANUAL_DATA = "COLLECTING_MANUAL_DATA",
  SUFFICIENT_FOR_REVIEW = "SUFFICIENT_FOR_REVIEW",
  BLOCKED_BY_RISK = "BLOCKED_BY_RISK",
  NOT_READY = "NOT_READY"
}

export interface FiscalShadowReplayMetricsSummary {
  generatedAt: string;
  totalQueueItems: number;
  totalValidated: number;
  totalSimulated: number;
  totalSkipped: number;
  totalBlocked: number;
  totalFailedSafe: number;
  totalBatches: number;
  totalBatchItems: number;
  totalReviewed: number;
  simulationOnly: boolean;
  activationBlocked: boolean;
  readOnly: boolean;
}

export interface FiscalShadowReplayRouteMetric {
  route: string;
  operation: string;
  totalItems: number;
  totalSimulated: number;
  totalBlocked: number;
  totalDifferences: number;
  highestSeverity: string;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplayBlockerMetric {
  blockerCode: string;
  blockerReason: string;
  count: number;
  affectedRoutes: string[];
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplaySeverityMetric {
  severity: string;
  count: number;
  affectedRoutes: string[];
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplayReadinessMetric {
  status: FiscalShadowReplayMetricsStatus;
  score: number;
  blockers: string[];
  warnings: string[];
  requiredBeforeActivation: string[];
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowReplayMetricsReport {
  summary: FiscalShadowReplayMetricsSummary;
  routeMetrics: FiscalShadowReplayRouteMetric[];
  blockerMetrics: FiscalShadowReplayBlockerMetric[];
  severityMetrics: FiscalShadowReplaySeverityMetric[];
  readiness: FiscalShadowReplayReadinessMetric;
  generatedAt: string;
  message: string;
  readOnly: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}
