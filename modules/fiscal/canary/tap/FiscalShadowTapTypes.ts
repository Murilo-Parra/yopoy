export enum FiscalShadowTapMode {
  HARD_OFF = "HARD_OFF",
  SIMULATION_ONLY = "SIMULATION_ONLY",
  POLICY_ONLY = "POLICY_ONLY",
  BLOCKED = "BLOCKED"
}

export interface FiscalShadowTapDecision {
  captureEnabled: boolean;
  captureRequest: boolean;
  captureResponse: boolean;
  routeToV2: boolean;
  routeToLegacy: boolean;
  legacyResponseOfficial: boolean;
  v2ResponseOfficial: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  reason: string;
  blockers: string[];
  warnings: string[];
}

export interface FiscalShadowTapSanitizedSnapshot {
  method: string;
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  statusCode?: number;
  responseShape?: any;
  requestShape?: any;
  v2Shape?: any;
  durationMs?: number;
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
}

export interface FiscalShadowTapAuditRecord {
  id: string;
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  captured: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  createdAt: string;
}
