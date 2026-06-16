import { FiscalSafeDifferenceBuilder } from "../proxy/FiscalSafeDifferenceBuilder";
import { FiscalShadowTapManualComparisonResult } from "./FiscalShadowTapManualTypes";
import { FiscalShadowTapSanitizer } from "./FiscalShadowTapSanitizer";

export class FiscalShadowTapManualComparisonService {
  private differenceBuilder: FiscalSafeDifferenceBuilder;
  private sanitizer: FiscalShadowTapSanitizer;

  constructor() {
    this.differenceBuilder = new FiscalSafeDifferenceBuilder();
    this.sanitizer = new FiscalShadowTapSanitizer();
  }

  public compareSnapshot(legacySnap: any, v2Snap: any): FiscalShadowTapManualComparisonResult {
    const sanitizedLegacy = this.sanitizer.sanitizeSnapshot(legacySnap);
    const sanitizedV2 = this.sanitizer.sanitizeSnapshot(v2Snap);

    const safeDifferences = this.differenceBuilder.buildDifferences(
      sanitizedLegacy.responseShape || {},
      sanitizedV2.responseShape || {}
    );

    return {
      compared: true,
      manualSimulation: true,
      matched: safeDifferences.length === 0,
      differenceCount: safeDifferences.length,
      differences: safeDifferences,
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
