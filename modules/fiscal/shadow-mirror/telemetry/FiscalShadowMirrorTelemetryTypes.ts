export enum FiscalShadowMirrorTelemetryMode {
  DESIGN_ONLY = 'DESIGN_ONLY',
  SYNTHETIC_EVENT_ONLY = 'SYNTHETIC_EVENT_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalShadowMirrorTelemetryStatus {
  EVENT_ACCEPTED_SYNTHETIC = 'EVENT_ACCEPTED_SYNTHETIC',
  EVENT_BLOCKED = 'EVENT_BLOCKED',
  BLOCKED_BY_SENSITIVE_INPUT = 'BLOCKED_BY_SENSITIVE_INPUT',
  BLOCKED_BY_REAL_TRAFFIC_ATTEMPT = 'BLOCKED_BY_REAL_TRAFFIC_ATTEMPT',
  BLOCKED_BY_GUARDRAIL = 'BLOCKED_BY_GUARDRAIL',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalShadowMirrorTelemetryEventInput {
  routeId: string;
  eventType: string;
  syntheticMethod?: string;
  syntheticPath?: string;
  syntheticStatusCode?: number;
  syntheticDurationMs?: number;
  syntheticRisk?: string;
  syntheticShapeSummary?: any;
  metadata?: any;
  requestedBy?: string;
  companyId: string;
}

export interface FiscalShadowMirrorTelemetryEventResult {
  success: boolean;
  status: FiscalShadowMirrorTelemetryStatus | string;
  routeId: string;
  safeEvent?: any;
  blockers: string[];
  warnings: string[];
  telemetryAccepted: boolean;
  telemetryPersisted: false;
  telemetryInMemoryOnly: true;
  telemetryFromRealTraffic: false;
  middlewareInstalled: false;
  tapInstalled: false;
  capturesRequest: false;
  capturesResponse: false;
  readsRealBody: false;
  readsRealResponse: false;
  routeToV2: false;
  routeToLegacy: true;
  designOnly: true;
  telemetryDesignOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorTelemetryReport {
  generatedAt: string;
  totalSyntheticEvents: number;
  totalBlocked: number;
  totalAccepted: number;
  byRoute: Record<string, number>;
  byEventType: Record<string, number>;
  byStatus: Record<string, number>;
  averageSyntheticDurationMs?: number;
  readOnly: true;
  designOnly: true;
  telemetryDesignOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
