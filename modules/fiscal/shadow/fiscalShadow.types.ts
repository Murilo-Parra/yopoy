export enum FiscalShadowMode {
  DISABLED = "DISABLED",
  DRY_RUN_COMPARE = "DRY_RUN_COMPARE",
  SANDBOX_COMPARE = "SANDBOX_COMPARE"
}

export enum FiscalShadowOperation {
  FISCAL_DOCUMENT_CREATE = "FISCAL_DOCUMENT_CREATE",
  NFE_CREATE = "NFE_CREATE",
  NFE_STATUS_UPDATE = "NFE_STATUS_UPDATE",
  NFCE_CREATE = "NFCE_CREATE",
  NFCE_CANCEL = "NFCE_CANCEL",
  DANFE_SAVE = "DANFE_SAVE",
  SEFAZ_PROTOCOL_SAVE = "SEFAZ_PROTOCOL_SAVE"
}

export interface FiscalShadowInput {
  companyId: string;
  userId?: string;
  operation: FiscalShadowOperation;
  legacyPayload: any;
  v2Payload: any;
  mode: FiscalShadowMode;
  source: "fiscal-v2-shadow";
}

export enum Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  BLOCKER = "BLOCKER"
}

export interface FiscalShadowDifference {
  field: string;
  legacyValueType?: string;
  v2ValueType?: string;
  severity: Severity;
  message: string;
}

export interface FiscalShadowComparisonResult {
  success: boolean;
  shadow: boolean;
  mode: FiscalShadowMode;
  operation: FiscalShadowOperation;
  matched: boolean;
  severity: Severity | null;
  summary: string;
  differences: FiscalShadowDifference[];
  warnings: string[];
  legacyShapeSummary?: any;
  v2ShapeSummary?: any;
  sensitiveFieldsMasked: true;
}
