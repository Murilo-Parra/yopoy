export enum FiscalShadowMirrorSimulationMode {
  MANUAL_ONLY = 'MANUAL_ONLY',
  SYNTHETIC_ONLY = 'SYNTHETIC_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalShadowMirrorSimulationStatus {
  SIMULATED = 'SIMULATED',
  BLOCKED_BY_ROUTE_RISK = 'BLOCKED_BY_ROUTE_RISK',
  BLOCKED_BY_CRITICAL_DEPENDENCY = 'BLOCKED_BY_CRITICAL_DEPENDENCY',
  BLOCKED_BY_SENSITIVE_INPUT = 'BLOCKED_BY_SENSITIVE_INPUT',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalShadowMirrorSimulationInput {
  routeId: string;
  syntheticLegacyShape?: any;
  syntheticV2Shape?: any;
  metadata?: any;
  requestedBy?: string;
  companyId: string;
}

export interface FiscalShadowMirrorSimulationResult {
  success: boolean;
  status: FiscalShadowMirrorSimulationStatus | string;
  routeId: string;
  differences: any[];
  warnings: string[];
  blockers: string[];
  manualOnly: true;
  syntheticOnly: true;
  captured: false;
  dispatched: false;
  routeToV2: false;
  routeToLegacy: true;
  planningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalShadowMirrorSimulationReport {
  generatedAt: string;
  totalSimulations: number;
  totalBlocked: number;
  totalSimulated: number;
  byRoute: Record<string, number>;
  byRisk: Record<string, number>;
  manualOnly: true;
  syntheticOnly: true;
  simulationOnly: true;
  activationBlocked: true;
}
