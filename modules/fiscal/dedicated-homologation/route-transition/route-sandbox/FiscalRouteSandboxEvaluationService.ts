import { FiscalRouteSandboxInput, FiscalRouteSandboxResult } from './FiscalRouteSandboxTypes';
import { FiscalRouteSandboxPolicy } from './FiscalRouteSandboxPolicy';
import { FiscalRouteSandboxBlueprint } from './FiscalRouteSandboxBlueprint';
import { FiscalWalledGardenIsolationPlan } from './FiscalWalledGardenIsolationPlan';
import { FiscalRouteSandboxNetworkPlan } from './FiscalRouteSandboxNetworkPlan';
import { FiscalRouteSandboxTenantIsolationPlan } from './FiscalRouteSandboxTenantIsolationPlan';
import { FiscalRouteSandboxDataBoundaryPlan } from './FiscalRouteSandboxDataBoundaryPlan';
import { FiscalRouteSandboxNoRuntimeExecutionEvidence } from './FiscalRouteSandboxNoRuntimeExecutionEvidence';
import { FiscalRouteSandboxSyntheticOnlyContract } from './FiscalRouteSandboxSyntheticOnlyContract';
import { FiscalRouteSandboxDependencyMatrix } from './FiscalRouteSandboxDependencyMatrix';
import { FiscalRouteSandboxBlockerRegister } from './FiscalRouteSandboxBlockerRegister';
import { FiscalRouteSandboxRiskRegister } from './FiscalRouteSandboxRiskRegister';

export class FiscalRouteSandboxEvaluationService {
  public static evaluate(input: FiscalRouteSandboxInput): FiscalRouteSandboxResult {
    const policyResult = FiscalRouteSandboxPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalRouteSandboxResult;
    }

    FiscalRouteSandboxBlueprint.generateBlueprint();
    FiscalWalledGardenIsolationPlan.generatePlan();
    FiscalRouteSandboxNetworkPlan.generatePlan();
    FiscalRouteSandboxTenantIsolationPlan.generatePlan();
    FiscalRouteSandboxDataBoundaryPlan.generatePlan();
    FiscalRouteSandboxNoRuntimeExecutionEvidence.generateEvidence();
    FiscalRouteSandboxSyntheticOnlyContract.generateContract();
    FiscalRouteSandboxDependencyMatrix.generateMatrix();

    const baseResult = FiscalRouteSandboxPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalRouteSandboxBlockerRegister.getBlockers(),
      warnings: FiscalRouteSandboxRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
