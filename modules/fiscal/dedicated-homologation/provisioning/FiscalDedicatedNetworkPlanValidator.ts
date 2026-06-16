import { FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';

export class FiscalDedicatedNetworkPlanValidator {
  public static validate(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const result = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.NETWORK);
    
    const plan = input.proposedPlan || {};
    if (!plan.segmentationProposed) {
      result.warnings.push('Network segmentation missing in plan.');
    }
    if (!plan.egressControlProposed) {
      result.warnings.push('Egress control missing in plan.');
    }
    
    return result;
  }
}
