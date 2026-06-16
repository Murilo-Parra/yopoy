export enum FiscalSandboxClosureStatus {
  CLOSED_WITH_GUARDRAILS = 'CLOSED_WITH_GUARDRAILS',
  CLOSED_WITH_WARNINGS = 'CLOSED_WITH_WARNINGS',
  BLOCKED_FOR_REAL_ACTIVATION = 'BLOCKED_FOR_REAL_ACTIVATION',
  FAILED_SAFE = 'FAILED_SAFE'
}

export enum FiscalSandboxClosureDomain {
  SANDBOX_PERSISTENCE = 'SANDBOX_PERSISTENCE',
  SANDBOX_REPLAY_BRIDGE = 'SANDBOX_REPLAY_BRIDGE',
  SANDBOX_REVIEW_RETENTION = 'SANDBOX_REVIEW_RETENTION',
  SANDBOX_INTEGRITY_METRICS = 'SANDBOX_INTEGRITY_METRICS',
  SANDBOX_EVIDENCE_CERTIFICATION = 'SANDBOX_EVIDENCE_CERTIFICATION',
  RLS = 'RLS',
  BOOT_POLICY = 'BOOT_POLICY',
  LEGACY_COMPATIBILITY = 'LEGACY_COMPATIBILITY',
  SEFAZ_ISOLATION = 'SEFAZ_ISOLATION',
  XML_PDF_ISOLATION = 'XML_PDF_ISOLATION'
}

export interface FiscalSandboxClosureInventoryItem {
  domain: FiscalSandboxClosureDomain | string;
  implemented: boolean;
  hasRoutes: boolean;
  hasSchema: boolean;
  readOnly: boolean;
  sandboxOnly: boolean;
  productionWrite: boolean;
  simulationOnly: boolean;
  activationBlocked: boolean;
  hasWorker: false;
  hasCron: false;
  hasSefaz: false;
  hasXmlSigning: false;
  hasPdfGeneration: false;
  notes: string;
}

export interface FiscalSandboxClosureGuardrail {
  id: string;
  name: string;
  passed: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence: string;
  blockerForRealActivation: boolean;
}

export interface FiscalSandboxClosureRisk {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  mitigation: string;
  blockerForRealActivation: boolean;
}

export interface FiscalSandboxClosureHandoff {
  generatedAt: string;
  currentModule: string;
  nextRecommendedDomain: string;
  allowedNextActions: string[];
  forbiddenNextActions: string[];
  blockersBeforeRealActivation: string[];
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
}

export interface FiscalSandboxClosureFinalReport {
  generatedAt: string;
  status: FiscalSandboxClosureStatus | string;
  inventory: FiscalSandboxClosureInventoryItem[];
  guardrails: FiscalSandboxClosureGuardrail[];
  risks: FiscalSandboxClosureRisk[];
  handoff: FiscalSandboxClosureHandoff;
  recommendations: string[];
  readOnly: true;
  sandboxOnly: true;
  productionWrite: false;
  simulationOnly: true;
  activationBlocked: true;
  approvedForRealCanary: false;
  approvedForProductionV2: false;
  payloadIncluded: false;
  sensitiveDataIncluded: false;
}
