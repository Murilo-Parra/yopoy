import { FiscalShadowTapManualCaptureResult } from "./FiscalShadowTapManualTypes";
import { FiscalShadowTapManualCaptureValidator } from "./FiscalShadowTapManualCaptureValidator";
import { FiscalShadowTapSanitizer } from "./FiscalShadowTapSanitizer";

export class FiscalShadowTapManualCaptureService {
  private validator: FiscalShadowTapManualCaptureValidator;
  private sanitizer: FiscalShadowTapSanitizer;

  constructor() {
    this.validator = new FiscalShadowTapManualCaptureValidator();
    this.sanitizer = new FiscalShadowTapSanitizer();
  }

  public simulateManualCapture(input: any): FiscalShadowTapManualCaptureResult {
    const validation = this.validator.validate(input);
    const warnings: string[] = [];
    
    let sanitizedSnapshot = undefined;

    if (validation.valid) {
      sanitizedSnapshot = this.sanitizer.sanitizeSnapshot(input);
    } else {
      warnings.push("Snapshot_blocked_by_validation");
    }

    return {
      captured: false,
      manualSimulation: true,
      captureEnabled: false,
      captureRequest: false,
      captureResponse: false,
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false,
      routeToV2: false,
      routeToLegacy: true,
      legacyResponseOfficial: true,
      v2ResponseOfficial: false,
      simulationOnly: true,
      activationBlocked: true,
      warnings,
      blockers: validation.blockers,
      snapshot: sanitizedSnapshot
    };
  }
  
  public validateSnapshot(input: any): any {
     const validation = this.validator.validate(input);
     return {
        valid: validation.valid,
        blockers: validation.blockers,
        simulationOnly: true,
        activationBlocked: true,
        sanitized: true,
        payloadPersisted: false,
        rawReturned: false
     }
  }
}
