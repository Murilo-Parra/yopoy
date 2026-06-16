import { FiscalShadowAuditField } from "./FiscalShadowAuditTypes";
import { FiscalShadowDifference } from "./fiscalShadow.types";

export class FiscalShadowSanitizer {
  private static sensitiveKeys = [
    "password", "senha", "certificate", "certificado",
    "token", "pfx", "privatekey", "secret", "rawxml", "signedxml",
    "base64", "authorization"
  ];

  public static sanitizeDifferences(diffs: FiscalShadowDifference[]): FiscalShadowAuditField[] {
    if (!diffs) return [];
    return diffs.map(d => ({
      field: this.maskIfSensitive(d.field),
      severity: d.severity,
      issueType: "DIFFERENCE",
      legacyType: d.legacyValueType,
      v2Type: d.v2ValueType,
      message: this.sanitizeMessage(d.message)
    }));
  }

  private static maskIfSensitive(fieldPath: string): string {
    const lowerPath = fieldPath.toLowerCase();
    for (const key of this.sensitiveKeys) {
      if (lowerPath.includes(key)) {
        return "***MASKED_FIELD***";
      }
    }
    return fieldPath;
  }

  private static sanitizeMessage(msg: string): string {
    let safeMsg = msg;
    const lowerMsg = safeMsg.toLowerCase();
    for (const key of this.sensitiveKeys) {
      if (lowerMsg.includes(key)) {
        return `[REDACTED SENSITIVE DIVERGENCE]`;
      }
    }
    return safeMsg;
  }
}
