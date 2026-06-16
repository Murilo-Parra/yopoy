import { FiscalShadowProxyComparisonResult } from "./FiscalShadowProxyTypes";
import { FiscalShadowProxySanitizer } from "./FiscalShadowProxySanitizer";
import { FiscalSafeDifferenceBuilder } from "./FiscalSafeDifferenceBuilder";
import { FiscalSafeShapeValidator } from "./FiscalSafeShapeValidator";

export class FiscalShadowProxyComparatorService {
  private sanitizer = new FiscalShadowProxySanitizer();
  private diffBuilder = new FiscalSafeDifferenceBuilder();
  private validator = new FiscalSafeShapeValidator();

  public compare(legacyShape: any, v2Shape: any): FiscalShadowProxyComparisonResult {
    const safeLegacy = this.sanitizer.sanitize(legacyShape || {});
    const safeV2 = this.sanitizer.sanitize(v2Shape || {});

    // Validate sanitized outputs
    const valLegacy = this.validator.validateSanitizedOutput(safeLegacy);
    const valV2 = this.validator.validateSanitizedOutput(safeV2);

    if (!valLegacy.valid || !valV2.valid) {
       return {
          matched: false,
          differenceCount: 0,
          differences: [],
          severity: "CRITICAL",
          sanitized: true,
          payloadPersisted: false,
       };
    }

    const differences = this.diffBuilder.buildDifferences(safeLegacy, safeV2);

    const differenceCount = differences.length;
    let severity = "LOW";
    if (differenceCount > 0) severity = "MEDIUM";
    if (differenceCount > 5) severity = "HIGH";

    return {
      matched: differenceCount === 0,
      differenceCount,
      differences,
      severity,
      sanitized: true,
      payloadPersisted: false
    };
  }
}
