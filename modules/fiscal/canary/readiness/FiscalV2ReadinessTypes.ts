export enum FiscalV2ReadinessStatus {
  NOT_READY = "NOT_READY",
  PARTIALLY_READY = "PARTIALLY_READY",
  READY_FOR_SHADOW_ONLY = "READY_FOR_SHADOW_ONLY",
  READY_FOR_REVIEW = "READY_FOR_REVIEW",
  BLOCKED_FOR_REAL_ACTIVATION = "BLOCKED_FOR_REAL_ACTIVATION"
}

export enum FiscalV2ReadinessDomain {
  CONTRACTS = "CONTRACTS",
  REPOSITORIES = "REPOSITORIES",
  SERVICES = "SERVICES",
  CONTROLLERS = "CONTROLLERS",
  ROUTES = "ROUTES",
  SANDBOX = "SANDBOX",
  DRY_RUN = "DRY_RUN",
  SHADOW = "SHADOW",
  AUDIT = "AUDIT",
  DASHBOARD = "DASHBOARD",
  CANARY_CONTROL = "CANARY_CONTROL",
  EVIDENCE = "EVIDENCE",
  COCKPIT = "COCKPIT",
  PRE_ACTIVATION = "PRE_ACTIVATION",
  RUNTIME_GUARD = "RUNTIME_GUARD",
  ROUTE_MAPPING = "ROUTE_MAPPING",
  SHADOW_PROXY = "SHADOW_PROXY",
  SAFE_SHAPE = "SAFE_SHAPE",
  BOOT_POLICY = "BOOT_POLICY",
  RLS = "RLS",
  LEGACY_COMPATIBILITY = "LEGACY_COMPATIBILITY"
}

export interface FiscalV2ReadinessCheck {
  id: string;
  domain: FiscalV2ReadinessDomain;
  name: string;
  status: string;
  severity: string;
  reason: string;
  evidence: string;
  requiredForRealActivation: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
}

export interface FiscalV2ReadinessRisk {
  id: string;
  domain: FiscalV2ReadinessDomain;
  severity: string;
  likelihood: string;
  impact: string;
  description: string;
  mitigation: string;
  blockerForRealActivation: boolean;
}

export interface FiscalV2ReadinessGap {
  id: string;
  domain: FiscalV2ReadinessDomain;
  description: string;
  requiredAction: string;
  priority: string;
  blockerForRealActivation: boolean;
}

export interface FiscalV2FinalReadinessReport {
  generatedAt: string;
  status: FiscalV2ReadinessStatus;
  score: number;
  approvedForRealCanary: boolean;
  approvedForProductionV2: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  checks: FiscalV2ReadinessCheck[];
  risks: FiscalV2ReadinessRisk[];
  gaps: FiscalV2ReadinessGap[];
  blockers: string[];
  recommendations: string[];
  requiredBeforeActivation: string[];
}
