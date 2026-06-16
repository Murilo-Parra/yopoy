import { FiscalSafeShapeSanitizer } from "../proxy/FiscalSafeShapeSanitizer";
import { FiscalShadowTapSanitizedSnapshot } from "./FiscalShadowTapTypes";

export class FiscalShadowTapSanitizer {
  private safeShapeSanitizer: FiscalSafeShapeSanitizer;

  constructor() {
    this.safeShapeSanitizer = new FiscalSafeShapeSanitizer();
  }

  public sanitizeSnapshot(input: any): FiscalShadowTapSanitizedSnapshot {
    return {
      method: input.method || "UNKNOWN",
      route: input.route || "/unknown",
      operation: input.operation || "UNKNOWN",
      companyId: input.companyId,
      userId: input.userId,
      statusCode: input.statusCode,
      requestShape: input.requestShape ? this.safeShapeSanitizer.sanitize(input.requestShape) : undefined,
      responseShape: input.responseShape ? this.safeShapeSanitizer.sanitize(input.responseShape) : undefined,
      v2Shape: input.v2Shape ? this.safeShapeSanitizer.sanitize(input.v2Shape) : undefined,
      durationMs: input.durationMs,
      sanitized: true,
      payloadPersisted: false,
      rawReturned: false
    };
  }
}
