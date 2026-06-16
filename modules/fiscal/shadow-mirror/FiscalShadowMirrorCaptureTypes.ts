export enum FiscalShadowMirrorCaptureMode {
  DRY_RUN_ONLY = 'DRY_RUN_ONLY',
  ADMIN_ENVELOPE_ONLY = 'ADMIN_ENVELOPE_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalShadowMirrorCaptureStatus {
  DRY_RUN_SIMULATED = 'DRY_RUN_SIMULATED',
  BLOCKED_BY_ROUTE_RISK = 'BLOCKED_BY_ROUTE_RISK',
  BLOCKED_BY_CRITICAL_DEPENDENCY = 'BLOCKED_BY_CRITICAL_DEPENDENCY',
  BLOCKED_BY_SENSITIVE_INPUT = 'BLOCKED_BY_SENSITIVE_INPUT',
  BLOCKED_BY_REAL_TRAFFIC_ATTEMPT = 'BLOCKED_BY_REAL_TRAFFIC_ATTEMPT',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalShadowMirrorCaptureEnvelope {
  routeId: string;
  syntheticMethod?: string;
  syntheticPath?: string;
  syntheticHeaders?: any;
  syntheticRequestShape?: any;
  syntheticResponseShape?: any;
  metadata?: any;
  requestedBy?: string;
  companyId: string;
}

export interface FiscalShadowMirrorCaptureDecision {
  shouldCapture: false;
  captureAllowed: false;
  dryRunOnly: true;
  reason: string;
  blockers: string[];
  warnings: string[];
}

export interface FiscalShadowMirrorCaptureResult {
  success: boolean;
  status: FiscalShadowMirrorCaptureStatus | string;
  routeId: string;
  decision: FiscalShadowMirrorCaptureDecision;
  safeEnvelope?: any;
  simulationResult?: any;
  warnings: string[];
  blockers: string[];
  dryRunOnly: true;
  adminEnvelopeOnly: true;
  captured: false;
  requestCaptured: false;
  responseCaptured: false;
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

export interface FiscalShadowMirrorCaptureReport {
  generatedAt: string;
  totalDryRuns: number;
  totalBlocked: number;
  totalValidated: number;
  byRoute: Record<string, number>;
  byStatus: Record<string, number>;
  dryRunOnly: true;
  simulationOnly: true;
  activationBlocked: true;
}
