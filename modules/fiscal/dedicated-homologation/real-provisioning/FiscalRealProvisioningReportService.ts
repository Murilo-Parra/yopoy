import { FiscalRealProvisioningIacFinalReport, FiscalRealProvisioningIacStatus } from './FiscalRealProvisioningIacTypes';
import { FiscalRealIacResourceCatalog } from './FiscalRealIacResourceCatalog';
import { FiscalRealIacStateBackendPlan } from './FiscalRealIacStateBackendPlan';
import { FiscalRealIacVariablePlan } from './FiscalRealIacVariablePlan';
import { FiscalRealSecretVaultDryRunContract } from './FiscalRealSecretVaultDryRunContract';
import { FiscalRealProvisioningDryRunService } from './FiscalRealProvisioningDryRunService';
import { FiscalRealIacPlanValidator } from './FiscalRealIacPlanValidator';
import { FiscalRealSecretPlanValidator } from './FiscalRealSecretPlanValidator';
import { FiscalRealCertificateSecretPlanValidator } from './FiscalRealCertificateSecretPlanValidator';
import { FiscalRealVaultAccessPolicyValidator } from './FiscalRealVaultAccessPolicyValidator';
import { FiscalRealVaultRotationPolicyValidator } from './FiscalRealVaultRotationPolicyValidator';
import { FiscalRealVaultAuditPolicyValidator } from './FiscalRealVaultAuditPolicyValidator';

export class FiscalRealProvisioningReportService {
  public static getReport(): FiscalRealProvisioningIacFinalReport {
    return {
      generatedAt: new Date().toISOString(),
      status: FiscalRealProvisioningIacStatus.IAC_PLAN_READY,
      resources: FiscalRealIacResourceCatalog.getCatalog(),
      stateBackend: FiscalRealIacStateBackendPlan.getPlan(),
      variables: FiscalRealIacVariablePlan.getPlan(),
      vaultContract: FiscalRealSecretVaultDryRunContract.getContract(),
      validations: {
        iacPlan: FiscalRealIacPlanValidator.validate({}),
        secrets: FiscalRealSecretPlanValidator.validate({}),
        certificate: FiscalRealCertificateSecretPlanValidator.validate({}),
        accessPolicy: FiscalRealVaultAccessPolicyValidator.validate({}),
        rotationPolicy: FiscalRealVaultRotationPolicyValidator.validate({}),
        auditPolicy: FiscalRealVaultAuditPolicyValidator.validate({})
      },
      evaluation: FiscalRealProvisioningDryRunService.executeDryRun({}),
      recommendations: [
        'O Módulo 12.2 foi encerrado em modo read-only/iac-plan-only/secret-vault-dry-run-only/infrastructure-contract-only/governance-only/simulation-only. Terraform apply, Pulumi up, deploy real, infraestrutura real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
      ],
      readOnly: true,
      iacPlanOnly: true,
      secretVaultDryRunOnly: true,
      infrastructureContractOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForIacPlanClosure: true,
      approvedForIacApply: false,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
