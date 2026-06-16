import { FiscalProductionPreflightInput, FiscalProductionPreflightResult } from './FiscalProductionPreflightTypes';
import { FiscalProductionPreflightPolicy } from './FiscalProductionPreflightPolicy';
import { FiscalProductionDeploymentReadinessChecklist } from './FiscalProductionDeploymentReadinessChecklist';
import { FiscalProductionPreflightEnvironmentReadiness } from './FiscalProductionPreflightEnvironmentReadiness';
import { FiscalProductionPreflightArtifactReadiness } from './FiscalProductionPreflightArtifactReadiness';
import { FiscalProductionPreflightCutoverReadiness } from './FiscalProductionPreflightCutoverReadiness';
import { FiscalProductionPreflightRollbackReadiness } from './FiscalProductionPreflightRollbackReadiness';
import { FiscalProductionPreflightTrafficReadiness } from './FiscalProductionPreflightTrafficReadiness';
import { FiscalProductionPreflightSecurityBoundaryCheck } from './FiscalProductionPreflightSecurityBoundaryCheck';
import { FiscalProductionPreflightDependencyMatrix } from './FiscalProductionPreflightDependencyMatrix';
import { FiscalProductionPreflightBlockerRegister } from './FiscalProductionPreflightBlockerRegister';
import { FiscalProductionPreflightRiskRegister } from './FiscalProductionPreflightRiskRegister';

export class FiscalProductionPreflightEvaluationService {
  public static evaluate(input: FiscalProductionPreflightInput): FiscalProductionPreflightResult {
    const policyResult = FiscalProductionPreflightPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionPreflightResult;
    }

    FiscalProductionDeploymentReadinessChecklist.generateChecklist();
    FiscalProductionPreflightEnvironmentReadiness.generateReadiness();
    FiscalProductionPreflightArtifactReadiness.generateReadiness();
    FiscalProductionPreflightCutoverReadiness.generateReadiness();
    FiscalProductionPreflightRollbackReadiness.generateReadiness();
    FiscalProductionPreflightTrafficReadiness.generateReadiness();
    FiscalProductionPreflightSecurityBoundaryCheck.checkBoundary();
    FiscalProductionPreflightDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionPreflightPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionPreflightBlockerRegister.getBlockers(),
      warnings: FiscalProductionPreflightRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
