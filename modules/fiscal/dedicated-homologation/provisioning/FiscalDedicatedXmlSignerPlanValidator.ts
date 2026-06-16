import { FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';

export class FiscalDedicatedXmlSignerPlanValidator {
  public static validate(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const result = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.XML_SIGNER);
    
    const plan = input.proposedPlan || {};
    if (!plan.isolatedSignerProposed) {
      result.warnings.push('Isolated signer missing in plan.');
    }
    
    return result;
  }
}
