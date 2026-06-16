export interface ShadowDashboardFiltersDTO {
  companyId?: string;
  route?: string;
  operation?: string;
  severity?: string;
  matched?: boolean | string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface ShadowDashboardSummaryDTO {
  totalRuns: number;
  totalMatched: number;
  totalDiverged: number;
  totalFailed: number; // if any
  totalBySeverity: Record<string, number>;
  totalByOperation: Record<string, number>;
  totalByRoute: Record<string, number>;
  readinessScore: number;
  generatedAt: string;
}

export interface ShadowDivergenceListItemDTO {
  id: string;
  companyIdMasked: string;
  route: string;
  operation: string;
  severity: string | null;
  matched: boolean;
  differenceCount: number;
  warningCount: number;
  durationMs: number;
  summary: string;
  fields: any; // Parsed sanitized fields
  createdAt: string;
}

export interface ShadowGovernanceWarning {
  type: string;
  message: string;
}

export interface ShadowGovernanceDTO {
  readinessScore: number;
  readinessClass: string;
  blockers: string[];
  warnings: ShadowGovernanceWarning[];
  recommendedNextSprint: string;
}
