import { FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';

export class FiscalDedicatedDanfePlanValidator {
  public static validate(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const result = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.DANFE);
    
    const plan = input.proposedPlan || {};
    if (!plan.rendererProposed) {
      result.warnings.push('Renderer missing in DANFE plan.');
    }
    
    return result;
  }
}
