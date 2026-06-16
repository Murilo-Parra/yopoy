import { FiscalSyntheticRouteDryRunInput, FiscalSyntheticRouteDryRunResult } from './FiscalSyntheticRouteDryRunTypes';
import { FiscalSyntheticRouteDryRunPolicy } from './FiscalSyntheticRouteDryRunPolicy';
import { FiscalSyntheticRouteScenarioCatalog } from './FiscalSyntheticRouteScenarioCatalog';
import { FiscalSyntheticLegacyResponseShapeCatalog } from './FiscalSyntheticLegacyResponseShapeCatalog';
import { FiscalSyntheticV2ResponseShapeCatalog } from './FiscalSyntheticV2ResponseShapeCatalog';
import { FiscalResponseShapeComparator } from './FiscalResponseShapeComparator';
import { FiscalSyntheticRouteCompatibilityMatrix } from './FiscalSyntheticRouteCompatibilityMatrix';
import { FiscalSyntheticRouteContractDiffService } from './FiscalSyntheticRouteContractDiffService';
import { FiscalSyntheticRouteNoHandlerCallEvidence } from './FiscalSyntheticRouteNoHandlerCallEvidence';
import { FiscalSyntheticRouteDryRunBlockerRegister } from './FiscalSyntheticRouteDryRunBlockerRegister';
import { FiscalSyntheticRouteDryRunRiskRegister } from './FiscalSyntheticRouteDryRunRiskRegister';

export class FiscalSyntheticRouteDryRunEvaluationService {
  public static evaluate(input: FiscalSyntheticRouteDryRunInput): FiscalSyntheticRouteDryRunResult {
    const policyResult = FiscalSyntheticRouteDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalSyntheticRouteDryRunResult;
    }

    FiscalSyntheticRouteScenarioCatalog.generateCatalog();
    FiscalSyntheticLegacyResponseShapeCatalog.generateCatalog();
    FiscalSyntheticV2ResponseShapeCatalog.generateCatalog();
    FiscalResponseShapeComparator.compare();
    FiscalSyntheticRouteCompatibilityMatrix.generateMatrix();
    FiscalSyntheticRouteContractDiffService.generateDiff();
    FiscalSyntheticRouteNoHandlerCallEvidence.generateEvidence();

    const baseResult = FiscalSyntheticRouteDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalSyntheticRouteDryRunBlockerRegister.getBlockers(),
      warnings: FiscalSyntheticRouteDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
