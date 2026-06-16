export enum FiscalSafeShapeMiddlewareMode {
  DESIGN_ONLY = 'DESIGN_ONLY',
  VALIDATION_ONLY = 'VALIDATION_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalSafeShapeMiddlewareStatus {
  DESIGN_READY = 'DESIGN_READY',
  ENVELOPE_VALID = 'ENVELOPE_VALID',
  ENVELOPE_BLOCKED = 'ENVELOPE_BLOCKED',
  BLOCKED_BY_GUARDRAIL = 'BLOCKED_BY_GUARDRAIL',
  BLOCKED_BY_SENSITIVE_INPUT = 'BLOCKED_BY_SENSITIVE_INPUT',
  FAILED_SAFE = 'FAILED_SAFE'
}

export interface FiscalSafeShapeMiddlewareEnvelopeInput {
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

export interface FiscalSafeShapeMiddlewareEnvelopeResult {
  success: boolean;
  status: FiscalSafeShapeMiddlewareStatus | string;
  routeId: string;
  safeEnvelope?: any;
  blockers: string[];
  warnings: string[];
  middlewareInstalled: false;
  middlewareActive: false;
  capturesRequest: false;
  capturesResponse: false;
  readsRealBody: false;
  readsRealResponse: false;
  callsLegacyHandler: false;
  callsV2Handler: false;
  routeToV2: false;
  routeToLegacy: true;
  designOnly: true;
  validationOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalSafeShapeMiddlewareDecision {
  allowed: false;
  installableNow: false;
  middlewareInstalled: false;
  reason: string;
  blockers: string[];
  warnings: string[];
  designOnly: true;
  validationOnly: true;
  activationBlocked: true;
}

export interface FiscalSafeShapeMiddlewareReport {
  generatedAt: string;
  totalValidations: number;
  totalBlocked: number;
  byRoute: Record<string, number>;
  byStatus: Record<string, number>;
  readOnly: true;
  designOnly: true;
  validationOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
