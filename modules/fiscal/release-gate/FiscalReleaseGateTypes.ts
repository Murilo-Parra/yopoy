export enum FiscalReleaseGateStatus {
  RELEASE_BLOCKED = 'RELEASE_BLOCKED',
  RELEASE_NOT_READY = 'RELEASE_NOT_READY',
  RELEASE_REVIEW_REQUIRED = 'RELEASE_REVIEW_REQUIRED',
  RELEASE_SIMULATION_READY = 'RELEASE_SIMULATION_READY',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalReleaseGateDomain {
  FISCAL_CONTRACTS = 'FISCAL_CONTRACTS',
  FISCAL_REPOSITORIES = 'FISCAL_REPOSITORIES',
  FISCAL_SERVICES = 'FISCAL_SERVICES',
  FISCAL_CONTROLLERS = 'FISCAL_CONTROLLERS',
  FISCAL_V2_READ_ONLY = 'FISCAL_V2_READ_ONLY',
  FISCAL_DRY_RUN = 'FISCAL_DRY_RUN',
  FISCAL_SANDBOX = 'FISCAL_SANDBOX',
  SHADOW_COMPARISON = 'SHADOW_COMPARISON',
  CANARY_CONTROL_PLANE = 'CANARY_CONTROL_PLANE',
  SHADOW_PROXY = 'SHADOW_PROXY',
  REPLAY_QUEUE = 'REPLAY_QUEUE',
  SANDBOX_PERSISTENCE = 'SANDBOX_PERSISTENCE',
  SHADOW_MIRROR = 'SHADOW_MIRROR',
  LOAD_PLANNING = 'LOAD_PLANNING',
  BOOT_POLICY = 'BOOT_POLICY',
  RLS = 'RLS',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  XML_PDF_ISOLATION = 'XML_PDF_ISOLATION'
}

export interface FiscalReleaseGateSignal {
  domain: FiscalReleaseGateDomain | string;
  available: boolean;
  status: string;
  evidence: string;
  blocker: boolean;
  notes: string;
  readOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRelease: false;
}

export interface FiscalReleaseGateEvaluationInput {
  requestedBy?: string;
  companyId?: string;
  targetDomain?: string;
  forceApproval?: boolean;
  metadata?: any;
}

export interface FiscalReleaseGateEvaluationResult {
  success: boolean;
  status: FiscalReleaseGateStatus | string;
  go: false;
  noGo: true;
  approvedForRelease: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  releaseActivated: false;
  canaryActivated: false;
  trafficChanged: false;
  blockers: string[];
  warnings: string[];
  signals: FiscalReleaseGateSignal[];
  readOnly: true;
  governanceOnly: true;
  releasePlanningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}

export interface FiscalReleaseGateFinalReport {
  generatedAt: string;
  status: FiscalReleaseGateStatus | string;
  signals: FiscalReleaseGateSignal[];
  criteria: any[];
  risks: any[];
  evaluation: any;
  handoff: any;
  recommendations: string[];
  readOnly: true;
  governanceOnly: true;
  releasePlanningOnly: true;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRelease: false;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
