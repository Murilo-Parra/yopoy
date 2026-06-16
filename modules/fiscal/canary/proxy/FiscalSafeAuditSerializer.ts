import { FiscalShadowProxyDispatchResult, FiscalShadowProxyComparisonResult } from "./FiscalShadowProxyTypes";
import { FiscalSafeShapeValidator } from "./FiscalSafeShapeValidator";

export class FiscalSafeAuditSerializer {
    private validator = new FiscalSafeShapeValidator();

    public serializeForAudit(route: string, operation: string, decision: FiscalShadowProxyDispatchResult, comparison?: FiscalShadowProxyComparisonResult) {
       const metadata = {
          blockers: decision.blockers,
          differences: comparison ? comparison.differenceCount : 0,
          dispatched: false, // Ensures shadow proxy dispatched was logged as false
          validation: "SAFE_SHAPE_OK"
       };

       const validation = this.validator.validateSanitizedOutput(metadata);

       if (!validation.valid) {
          return {
             valid: false,
             skippedReason: "Serializer blocked payload persistence due to safe shape violation.",
             metadata: { error: "SAFE_SHAPE_VIOLATION_PREVENTED_PERSISTENCE", dispatched: false }
          };
       }

       return {
          valid: true,
          metadata
       };
    }
}
