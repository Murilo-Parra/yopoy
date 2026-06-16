import { FiscalProductionReleaseGatewayInput, FiscalProductionReleaseGatewayResult } from './FiscalProductionReleaseGatewayTypes';
import { FiscalProductionReleaseGatewayPolicy } from './FiscalProductionReleaseGatewayPolicy';
import { FiscalProductionReleaseGatewayBlockerRegister } from './FiscalProductionReleaseGatewayBlockerRegister';
import { FiscalProductionReleaseGatewayRiskRegister } from './FiscalProductionReleaseGatewayRiskRegister';
import { FiscalProductionReleaseHandshakePlan } from './FiscalProductionReleaseHandshakePlan';
import { FiscalProductionAuthorizationDependencyCheck } from './FiscalProductionAuthorizationDependencyCheck';
import { FiscalProductionLegalAuditDependencyCheck } from './FiscalProductionLegalAuditDependencyCheck';
import { FiscalProductionCanaryDependencyCheck } from './FiscalProductionCanaryDependencyCheck';
import { FiscalProductionRollbackDependencyCheck } from './FiscalProductionRollbackDependencyCheck';
import { FiscalProductionKillSwitchDependencyCheck } from './FiscalProductionKillSwitchDependencyCheck';
import { FiscalProductionSefazReadinessCheck } from './FiscalProductionSefazReadinessCheck';

export class FiscalProductionReleaseGatewayEvaluationService {
  public static evaluate(input: FiscalProductionReleaseGatewayInput): FiscalProductionReleaseGatewayResult {
    const policyResult = FiscalProductionReleaseGatewayPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionReleaseGatewayResult;
    }

    // Generate structurally mocked dependencies
    FiscalProductionReleaseHandshakePlan.generatePlan();
    FiscalProductionAuthorizationDependencyCheck.check();
    FiscalProductionLegalAuditDependencyCheck.check();
    FiscalProductionCanaryDependencyCheck.check();
    FiscalProductionRollbackDependencyCheck.check();
    FiscalProductionKillSwitchDependencyCheck.check();
    FiscalProductionSefazReadinessCheck.check();

    const baseResult = FiscalProductionReleaseGatewayPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionReleaseGatewayBlockerRegister.getBlockers(),
      warnings: FiscalProductionReleaseGatewayRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
