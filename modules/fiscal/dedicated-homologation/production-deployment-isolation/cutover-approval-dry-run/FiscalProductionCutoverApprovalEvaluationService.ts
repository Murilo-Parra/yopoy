import { FiscalProductionCutoverApprovalInput, FiscalProductionCutoverApprovalResult } from './FiscalProductionCutoverApprovalTypes';
import { FiscalProductionCutoverApprovalPolicy } from './FiscalProductionCutoverApprovalPolicy';
import { FiscalProductionCutoverReadinessPlan } from './FiscalProductionCutoverReadinessPlan';
import { FiscalProductionRollbackGovernancePlan } from './FiscalProductionRollbackGovernancePlan';
import { FiscalProductionGoNoGoApprovalMatrix } from './FiscalProductionGoNoGoApprovalMatrix';
import { FiscalProductionChangeWindowReadiness } from './FiscalProductionChangeWindowReadiness';
import { FiscalProductionOperationalFreezePlan } from './FiscalProductionOperationalFreezePlan';
import { FiscalProductionCutoverAbortCriteria } from './FiscalProductionCutoverAbortCriteria';
import { FiscalProductionCutoverDependencyMatrix } from './FiscalProductionCutoverDependencyMatrix';
import { FiscalProductionCutoverApprovalBlockerRegister } from './FiscalProductionCutoverApprovalBlockerRegister';
import { FiscalProductionCutoverApprovalRiskRegister } from './FiscalProductionCutoverApprovalRiskRegister';

export class FiscalProductionCutoverApprovalEvaluationService {
  public static evaluate(input: FiscalProductionCutoverApprovalInput): FiscalProductionCutoverApprovalResult {
    const policyResult = FiscalProductionCutoverApprovalPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalProductionCutoverApprovalResult;
    }

    FiscalProductionCutoverReadinessPlan.generatePlan();
    FiscalProductionRollbackGovernancePlan.generatePlan();
    FiscalProductionGoNoGoApprovalMatrix.generateMatrix();
    FiscalProductionChangeWindowReadiness.generateReadiness();
    FiscalProductionOperationalFreezePlan.generatePlan();
    FiscalProductionCutoverAbortCriteria.generateCriteria();
    FiscalProductionCutoverDependencyMatrix.generateMatrix();

    const baseResult = FiscalProductionCutoverApprovalPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalProductionCutoverApprovalBlockerRegister.getBlockers(),
      warnings: FiscalProductionCutoverApprovalRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
