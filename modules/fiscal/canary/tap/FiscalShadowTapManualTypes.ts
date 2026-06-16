export interface FiscalShadowTapManualSnapshot {
  method: string;
  route: string;
  operation: string;
  companyId?: string;
  userId?: string;
  requestShape?: any;
  responseShape?: any;
  statusCode?: number;
  durationMs?: number;
  metadata?: any;
}

export interface FiscalShadowTapManualCaptureResult {
  captured: boolean;
  manualSimulation: boolean;
  captureEnabled: boolean;
  captureRequest: boolean;
  captureResponse: boolean;
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
  routeToV2: boolean;
  routeToLegacy: boolean;
  legacyResponseOfficial: boolean;
  v2ResponseOfficial: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  warnings: string[];
  blockers: string[];
  snapshot?: any;
}

export interface FiscalShadowTapManualComparisonResult {
  compared: boolean;
  manualSimulation: boolean;
  matched: boolean;
  differenceCount: number;
  differences: any[];
  sanitized: boolean;
  payloadPersisted: boolean;
  rawReturned: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalShadowTapManualReport {
  generatedAt: string;
  totalSimulations: number;
  totalBlocked: number;
  totalSanitized: number;
  totalDifferences: number;
  simulationOnly: boolean;
  activationBlocked: boolean;
}
