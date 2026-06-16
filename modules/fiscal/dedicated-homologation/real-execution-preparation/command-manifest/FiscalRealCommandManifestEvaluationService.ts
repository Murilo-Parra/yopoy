import { FiscalRealCommandManifestInput, FiscalRealCommandManifestResult, FiscalRealCommandManifestStatus } from './FiscalRealCommandManifestTypes';
import { FiscalRealCommandManifestPolicy } from './FiscalRealCommandManifestPolicy';
import { FiscalRealCommandManifestSanitizer } from './FiscalRealCommandManifestSanitizer';
import { FiscalRealCommandManifestValidator } from './FiscalRealCommandManifestValidator';

export class FiscalRealCommandManifestEvaluationService {
  public static evaluate(rawInput: FiscalRealCommandManifestInput): FiscalRealCommandManifestResult {
    const input = FiscalRealCommandManifestSanitizer.sanitize(rawInput);
    
    const policyResult = FiscalRealCommandManifestPolicy.enforce(input);
    if (policyResult && policyResult.success === false) {
      return policyResult as FiscalRealCommandManifestResult;
    }

    const result = FiscalRealCommandManifestPolicy.getBaseResult();
    const validation = FiscalRealCommandManifestValidator.validate(input);

    return {
      ...result,
      status: FiscalRealCommandManifestStatus.DRY_RUN_MANIFEST_READY,
      evaluationExecuted: true,
      manifestGenerated: true,
      decisionSimulated: true,
      go: false,
      noGo: true,
      warnings: validation.warnings
    };
  }
}
