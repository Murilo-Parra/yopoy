import { FiscalDedicatedProvisioningValidationInput, FiscalDedicatedProvisioningValidationResult, FiscalDedicatedProvisioningDomain } from './FiscalDedicatedProvisioningTypes';
import { FiscalDedicatedProvisioningPolicy } from './FiscalDedicatedProvisioningPolicy';
import { FiscalDedicatedNetworkPlanValidator } from './FiscalDedicatedNetworkPlanValidator';
import { FiscalDedicatedDatabasePlanValidator } from './FiscalDedicatedDatabasePlanValidator';
import { FiscalDedicatedSecretVaultPlanValidator } from './FiscalDedicatedSecretVaultPlanValidator';
import { FiscalDedicatedCertificatePlanValidator } from './FiscalDedicatedCertificatePlanValidator';
import { FiscalDedicatedSefazPlanValidator } from './FiscalDedicatedSefazPlanValidator';
import { FiscalDedicatedXmlSignerPlanValidator } from './FiscalDedicatedXmlSignerPlanValidator';
import { FiscalDedicatedDanfePlanValidator } from './FiscalDedicatedDanfePlanValidator';
import { FiscalDedicatedObservabilityPlanValidator } from './FiscalDedicatedObservabilityPlanValidator';
import { FiscalDedicatedRollbackPlanValidator } from './FiscalDedicatedRollbackPlanValidator';

export class FiscalDedicatedProvisioningDryRunService {
  public static executeDryRun(input: FiscalDedicatedProvisioningValidationInput): FiscalDedicatedProvisioningValidationResult {
    const policyResult = FiscalDedicatedProvisioningPolicy.enforce(input);
    if (policyResult) return policyResult as FiscalDedicatedProvisioningValidationResult;

    const validations = [
      FiscalDedicatedNetworkPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.NETWORK }),
      FiscalDedicatedDatabasePlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.DATABASE }),
      FiscalDedicatedSecretVaultPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.SECRET_VAULT }),
      FiscalDedicatedCertificatePlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.CERTIFICATE }),
      FiscalDedicatedSefazPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.SEFAZ }),
      FiscalDedicatedXmlSignerPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.XML_SIGNER }),
      FiscalDedicatedDanfePlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.DANFE }),
      FiscalDedicatedObservabilityPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.OBSERVABILITY }),
      FiscalDedicatedRollbackPlanValidator.validate({ ...input, domain: FiscalDedicatedProvisioningDomain.ROLLBACK })
    ];

    const blockers = validations.flatMap(v => v.blockers).filter((value, index, self) => self.indexOf(value) === index);
    const warnings = validations.flatMap(v => v.warnings).filter((value, index, self) => self.indexOf(value) === index);

    const base = FiscalDedicatedProvisioningPolicy.getBaseResult(FiscalDedicatedProvisioningDomain.FULL_STACK);
    base.blockers = blockers.length > 0 ? blockers : base.blockers;
    base.warnings = warnings;

    return base;
  }
}
