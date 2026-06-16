import { FiscalDedicatedProvisioningDomain, FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningStatus } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';

export class FiscalDedicatedDatabasePlanValidator {
  public static validate(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const result = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.DATABASE);
    
    const plan = input.proposedPlan || {};
    if (!plan.logicalDatabaseName) {
      result.warnings.push('Logical database name missing in plan.');
    }
    if (!plan.rlsMandatoryProposed) {
      result.warnings.push('RLS configuration missing in plan.');
    }
    
    return result;
  }
}
