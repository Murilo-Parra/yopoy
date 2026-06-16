export enum FiscalShadowMirrorMode {
  PLANNING_ONLY = 'PLANNING_ONLY',
  PASSIVE_REGISTRY_ONLY = 'PASSIVE_REGISTRY_ONLY',
  BLOCKED = 'BLOCKED'
}

export enum FiscalShadowMirrorRouteRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum FiscalShadowMirrorDependencyType {
  DATABASE_READ = 'DATABASE_READ',
  DATABASE_WRITE = 'DATABASE_WRITE',
  SEFAZ = 'SEFAZ',
  XML_SIGNING = 'XML_SIGNING',
  PDF_GENERATION = 'PDF_GENERATION',
  CERTIFICATE_ACCESS = 'CERTIFICATE_ACCESS',
  WORKER = 'WORKER',
  AUTH = 'AUTH',
  RLS = 'RLS',
  LEGACY_ONLY = 'LEGACY_ONLY'
}

export enum FiscalShadowMirrorEligibility {
  ELIGIBLE_FOR_FUTURE_PASSIVE_SIMULATION = 'ELIGIBLE_FOR_FUTURE_PASSIVE_SIMULATION',
  NEEDS_SANDBOX_EVIDENCE = 'NEEDS_SANDBOX_EVIDENCE',
  BLOCKED_BY_CRITICAL_DEPENDENCY = 'BLOCKED_BY_CRITICAL_DEPENDENCY',
  BLOCKED_BY_SIDE_EFFECT = 'BLOCKED_BY_SIDE_EFFECT',
  NOT_MAPPED = 'NOT_MAPPED'
}

export interface FiscalShadowMirrorRouteDescriptor {
  id: string;
  legacyMethod: string;
  legacyPath: string;
  v2CandidatePath?: string;
  operation: string;
  risk: FiscalShadowMirrorRouteRisk | string;
  eligibility: FiscalShadowMirrorEligibility | string;
  dependencies: Array<FiscalShadowMirrorDependencyType | string>;
  sideEffects: string[];
  requiresSefaz: boolean;
  requiresXmlSigning: boolean;
  requiresPdfGeneration: boolean;
  requiresCertificate: boolean;
  canMirrorFuture: false;
  routeToV2: false;
  routeToLegacy: true;
  planningOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorPlan {
  generatedAt: string;
  totalRoutes: number;
  eligibleFutureCandidates: number;
  blockedRoutes: number;
  criticalRoutes: number;
  nextSteps: string[];
  forbiddenActions: string[];
  planningOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalShadowMirrorReport {
  generatedAt: string;
  routes: FiscalShadowMirrorRouteDescriptor[];
  risks: any[];
  dependencies: any[];
  plan: FiscalShadowMirrorPlan;
  readOnly: true;
  planningOnly: true;
  activationBlocked: true;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
