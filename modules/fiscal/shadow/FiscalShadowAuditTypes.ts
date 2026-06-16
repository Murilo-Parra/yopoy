export interface FiscalShadowAuditRecord {
  companyId: string;
  userId?: string;
  requestId?: string;
  route: string;
  operation: string;
  severity: string | null;
  matched: boolean;
  differenceCount: number;
  warningCount: number;
  durationMs: number;
  summary: string;
  fields: string; // Serialized but sanitized JSON representation
  source: "fiscal-v2-shadow";
  createdAt: string;
}

export interface FiscalShadowAuditField {
  field: string;
  severity: string;
  issueType: string;
  legacyType?: string;
  v2Type?: string;
  message: string;
}

export interface FiscalShadowAuditResult {
  success: boolean;
  persisted: boolean;
  recordId?: string;
  skippedReason?: string;
}
