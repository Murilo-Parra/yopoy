import { FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';

export class FiscalDedicatedRollbackPlanValidator {
  public static validate(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const result = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.ROLLBACK);
    
    const plan = input.proposedPlan || {};
    if (!plan.rollbackPolicyProposed) {
      result.warnings.push('Rollback policy missing in plan.');
    }
    if (!plan.killSwitchPolicyProposed) {
      result.warnings.push('Kill switch policy missing in plan.');
    }
    
    return result;
  }
}
