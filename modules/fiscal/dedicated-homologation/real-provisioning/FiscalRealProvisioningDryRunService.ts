import { FiscalRealProvisioningIacEvaluationInput, FiscalRealProvisioningIacEvaluationResult } from './FiscalRealProvisioningIacTypes';
import { FiscalRealIacPolicy } from './FiscalRealIacPolicy';
import { FiscalRealIacPlanValidator } from './FiscalRealIacPlanValidator';
import { FiscalRealSecretPlanValidator } from './FiscalRealSecretPlanValidator';
import { FiscalRealCertificateSecretPlanValidator } from './FiscalRealCertificateSecretPlanValidator';
import { FiscalRealVaultAccessPolicyValidator } from './FiscalRealVaultAccessPolicyValidator';
import { FiscalRealVaultRotationPolicyValidator } from './FiscalRealVaultRotationPolicyValidator';
import { FiscalRealVaultAuditPolicyValidator } from './FiscalRealVaultAuditPolicyValidator';

export class FiscalRealProvisioningDryRunService {
  public static executeDryRun(input: FiscalRealProvisioningIacEvaluationInput): FiscalRealProvisioningIacEvaluationResult {
    const policyResult = FiscalRealIacPolicy.enforce(input);
    if (policyResult) {
      return policyResult as FiscalRealProvisioningIacEvaluationResult;
    }

    const result = FiscalRealIacPolicy.getBaseResult();

    const valIac = FiscalRealIacPlanValidator.validate(input.proposedPlan || {});
    if (!valIac.validationPassed) result.blockers.push(...valIac.blockers);

    const valSecrets = FiscalRealSecretPlanValidator.validate(input.proposedPlan || {});
    if (!valSecrets.validationPassed) result.blockers.push(...valSecrets.blockers);

    const valCert = FiscalRealCertificateSecretPlanValidator.validate(input.proposedPlan || {});
    if (!valCert.validationPassed) result.blockers.push(...valCert.blockers);

    const valAccess = FiscalRealVaultAccessPolicyValidator.validate(input.proposedPlan || {});
    if (!valAccess.validationPassed) result.blockers.push(...valAccess.blockers);

    const valRot = FiscalRealVaultRotationPolicyValidator.validate(input.proposedPlan || {});
    if (!valRot.validationPassed) result.blockers.push(...valRot.blockers);

    const valAudit = FiscalRealVaultAuditPolicyValidator.validate(input.proposedPlan || {});
    if (!valAudit.validationPassed) result.blockers.push(...valAudit.blockers);

    if (result.blockers.length > 1) {
      result.success = false;
      result.go = false;
      result.noGo = true;
    } else {
      result.success = true;
      result.go = false;
      result.noGo = true; // Still no real apply
    }

    return result;
  }
}
