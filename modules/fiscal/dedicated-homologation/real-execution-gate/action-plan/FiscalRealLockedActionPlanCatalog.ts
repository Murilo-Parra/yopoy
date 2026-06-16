import { FiscalRealLockedActionPlanItem } from './FiscalRealExecutionActionPlanTypes';

export class FiscalRealLockedActionPlanCatalog {
  public static getCatalog(): FiscalRealLockedActionPlanItem[] {
    return [
      {
        id: 'L-ACT-01',
        domain: 'IAC_APPLY',
        label: 'VALIDATE_IAC_DRY_RUN',
        commandType: 'VALIDATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-02',
        domain: 'SECURITY_REVIEW',
        label: 'VALIDATE_SECURITY_REVIEW',
        commandType: 'VALIDATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-03',
        domain: 'CHANGE_WINDOW',
        label: 'VALIDATE_CHANGE_WINDOW',
        commandType: 'VALIDATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-04',
        domain: 'DUAL_APPROVAL',
        label: 'VALIDATE_DUAL_APPROVAL',
        commandType: 'VALIDATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-05',
        domain: 'IAC_APPLY',
        label: 'PREPARE_TERRAFORM_APPLY_REQUEST',
        commandType: 'PROVISIONING',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-06',
        domain: 'IAC_APPLY',
        label: 'PREPARE_PULUMI_UP_REQUEST',
        commandType: 'PROVISIONING',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-07',
        domain: 'DATABASE',
        label: 'PREPARE_DATABASE_PROVISIONING_REQUEST',
        commandType: 'PROVISIONING',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-08',
        domain: 'SECRET_VAULT',
        label: 'PREPARE_VAULT_PROVISIONING_REQUEST',
        commandType: 'PROVISIONING',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-09',
        domain: 'CERTIFICATE',
        label: 'PREPARE_CERTIFICATE_LOAD_REQUEST',
        commandType: 'CONFIGURATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-10',
        domain: 'SEFAZ',
        label: 'PREPARE_SEFAZ_HOMOLOGATION_REQUEST',
        commandType: 'EXECUTION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-11',
        domain: 'XML_SIGNER',
        label: 'PREPARE_XML_SIGNING_REQUEST',
        commandType: 'EXECUTION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-12',
        domain: 'DANFE',
        label: 'PREPARE_DANFE_RENDERING_REQUEST',
        commandType: 'EXECUTION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      },
      {
        id: 'L-ACT-13',
        domain: 'PRODUCTION_V2',
        label: 'PREPARE_PRODUCTION_V2_REQUEST',
        commandType: 'ACTIVATION',
        realCommandGenerated: false,
        realCommandExecutable: false,
        executionAllowed: false,
        requiresNewExplicitModule: true,
        blockerReason: 'Execução real bloqueada'
      }
    ];
  }
}
