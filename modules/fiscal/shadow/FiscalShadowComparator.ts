import { FiscalShadowDifference, Severity } from "./fiscalShadow.types";

export class FiscalShadowComparator {
  private sensitiveFields = [
    "password",
    "certificate",
    "encrypted_certificate",
    "encrypted_password",
    "pfx",
    "privatekey",
    "token",
    "session",
    "xml",
    "rawxml",
    "signedxml",
    "xmlcontent",
    "accesskey",
    "chavenfe",
    "chavenfce",
    "cpf",
    "cnpj",
    "customercnpjcpf"
  ];

  public comparePayloads(legacyPayload: any, v2Payload: any): FiscalShadowDifference[] {
    const differences: FiscalShadowDifference[] = [];
    const safeLegacy = this.maskSensitiveData(legacyPayload) || {};
    const safeV2 = this.maskSensitiveData(v2Payload) || {};

    const allKeys = new Set([...Object.keys(safeLegacy), ...Object.keys(safeV2)]);

    for (const key of allKeys) {
      this.compareField(key, safeLegacy[key], safeV2[key], differences);
    }

    return differences;
  }

  private compareField(field: string, legacyVal: any, v2Val: any, differences: FiscalShadowDifference[]) {
    // If one is undefined and other is present
    if (legacyVal === undefined && v2Val !== undefined) {
      differences.push({
        field,
        v2ValueType: typeof v2Val,
        severity: Severity.LOW,
        message: "Campo presente na V2 mas ausente no payload Legado."
      });
      return;
    }

    if (legacyVal !== undefined && v2Val === undefined) {
      differences.push({
        field,
        legacyValueType: typeof legacyVal,
        severity: Severity.HIGH,
        message: "Campo obrigatório no Legado ausente no payload V2."
      });
      return;
    }

    // Type mismatch
    const legType = typeof legacyVal;
    const v2Type = typeof v2Val;

    if (legType !== v2Type && legacyVal !== null && v2Val !== null) {
      differences.push({
        field,
        legacyValueType: legType,
        v2ValueType: v2Type,
        severity: Severity.MEDIUM,
        message: `Divergência de tipos no campo ${field}.`
      });
    }

    // Basic value mismatch (if it's primitive)
    if (legType !== "object" && v2Type !== "object" && legacyVal !== v2Val) {
      // If masked, we just note they differ in value (or maybe not, just type)
      // Since it's a comparison for structural readiness, differing primitive values might be just mapping.
      // But let's log it as LOW severity if they don't match structurally.
      differences.push({
        field,
        legacyValueType: legType,
        v2ValueType: v2Type,
        severity: Severity.LOW,
        message: `Valores divergem para o campo ${field}.`
      });
    }

    // Deep compare could go here, but for shadow we focus on top-level or types.
  }

  public maskSensitiveData(payload: any): any {
    if (!payload || typeof payload !== "object") return payload;

    if (Array.isArray(payload)) {
      return payload.map(item => this.maskSensitiveData(item));
    }

    const masked: any = {};
    for (const key of Object.keys(payload)) {
      const lowerKey = key.toLowerCase();
      let isSensitive = false;
      
      for (const sensitive of this.sensitiveFields) {
        if (lowerKey.includes(sensitive)) {
          isSensitive = true;
          break;
        }
      }

      if (isSensitive) {
        masked[key] = "***MASKED***";
      } else if (typeof payload[key] === "object") {
        masked[key] = this.maskSensitiveData(payload[key]);
      } else {
        masked[key] = payload[key];
      }
    }

    return masked;
  }
}
