import { FiscalProductionCanaryDryRunInput, FiscalProductionCanaryDryRunResult } from './FiscalProductionCanaryDryRunTypes';
import { FiscalProductionCanaryDryRunPolicy } from './FiscalProductionCanaryDryRunPolicy';
import { FiscalProductionCanaryDryRunBlockerRegister } from './FiscalProductionCanaryDryRunBlockerRegister';
import { FiscalProductionCanaryDryRunRiskRegister } from './FiscalProductionCanaryDryRunRiskRegister';
import { FiscalProductionCanaryScopeCatalog } from './FiscalProductionCanaryScopeCatalog';
import { FiscalProductionTenantEligibilityMatrix } from './FiscalProductionTenantEligibilityMatrix';
import { FiscalProductionTrafficSwitchDryRunPlan } from './FiscalProductionTrafficSwitchDryRunPlan';
import { FiscalProductionCanaryPercentagePlan } from './FiscalProductionCanaryPercentagePlan';
import { FiscalProductionCanaryKillSwitchReadiness } from './FiscalProductionCanaryKillSwitchReadiness';
import { FiscalProductionCanaryRollbackReadiness } from './FiscalProductionCanaryRollbackReadiness';

export class FiscalProductionCanaryDryRunEvaluationService {
  public static evaluate(input: FiscalProductionCanaryDryRunInput): FiscalProductionCanaryDryRunResult {
    const policyResult = FiscalProductionCanaryDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCanaryDryRunResult;
    }

    // Conceptually generate all
    FiscalProductionCanaryScopeCatalog.generateCatalog(input);
    FiscalProductionTenantEligibilityMatrix.generateMatrix();
    FiscalProductionTrafficSwitchDryRunPlan.generatePlan();
    FiscalProductionCanaryPercentagePlan.generatePlan(input.intendedCanaryPercentage);
    FiscalProductionCanaryKillSwitchReadiness.generateReadiness();
    FiscalProductionCanaryRollbackReadiness.generateReadiness();

    const baseResult = FiscalProductionCanaryDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCanaryDryRunBlockerRegister.getBlockers(),
      warnings: FiscalProductionCanaryDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
