export enum FiscalShadowProxyMode {
  DISABLED = "DISABLED",
  HARNESS_ONLY = "HARNESS_ONLY",
  SIMULATION_ONLY = "SIMULATION_ONLY",
  BLOCKED = "BLOCKED"
}

export interface FiscalShadowProxyDispatchInput {
  legacyMethod: string;
  legacyPath: string;
  operation?: string;
  companyId?: string;
  samplePayload?: any;
  legacyShape?: any;
  v2Shape?: any;
  metadata?: any;
}

export interface FiscalShadowProxyDispatchResult {
  dispatched: boolean;
  legacyOfficial: boolean;
  v2Official: boolean;
  routeToV2: boolean;
  routeToLegacy: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  mappingId?: string;
  comparison?: any;
  warnings: string[];
  blockers: string[];
}

export interface FiscalShadowProxyComparisonResult {
  matched: boolean;
  differenceCount: number;
  differences: any[];
  severity: string;
  sanitized: boolean;
  payloadPersisted: boolean;
}

export interface FiscalShadowProxyAuditRecord {
  id: string;
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  mappingId?: string;
  severity: string;
  differenceCount: number;
  createdAt: string;
  simulationOnly: boolean;
  activationBlocked: boolean;
}
