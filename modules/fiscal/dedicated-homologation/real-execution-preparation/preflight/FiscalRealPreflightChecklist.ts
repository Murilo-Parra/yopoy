export class FiscalRealPreflightChecklist {
  public static getChecklist() {
    return [
      { id: 'C-PF-01', description: 'Módulo 13 encerrado documentalmente.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'Module 13 closed.' },
      { id: 'C-PF-02', description: 'Módulo 14.1 Operational Envelope criado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'Module 14.1 generated.' },
      { id: 'C-PF-03', description: 'Módulo 14.2 Command Manifest criado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'Module 14.2 generated.' },
      { id: 'C-PF-04', description: 'Gate real permanece bloqueado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realExecutionGateUnlocked false.' },
      { id: 'C-PF-05', description: 'Execução real permanece não autorizada.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realExecutionAuthorized false.' },
      { id: 'C-PF-06', description: 'Manifesto não executável.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'manifestExecutable false.' },
      { id: 'C-PF-07', description: 'Manifesto não assinado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'manifestSigned false.' },
      { id: 'C-PF-08', description: 'Manifesto não persistido.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'manifestPersisted false.' },
      { id: 'C-PF-09', description: 'Manifesto sem comando real.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realCommandIncluded false.' },
      { id: 'C-PF-10', description: 'Manifesto sem shell command.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'shellCommandIncluded false.' },
      { id: 'C-PF-11', description: 'Manifesto sem secret.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'containsSecret false.' },
      { id: 'C-PF-12', description: 'Manifesto sem payload.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'payloadIncluded false.' },
      { id: 'C-PF-13', description: 'IaC real permanece não aplicado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'iacApplied false.' },
      { id: 'C-PF-14', description: 'Terraform apply permanece não executado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'terraformApplied false.' },
      { id: 'C-PF-15', description: 'Pulumi up permanece não executado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'pulumiApplied false.' },
      { id: 'C-PF-16', description: 'Cloud deploy permanece não executado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'cloudFormationDeployed false.' },
      { id: 'C-PF-17', description: 'Banco real permanece não criado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'databaseProvisioned false.' },
      { id: 'C-PF-18', description: 'Vault real permanece não criado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'vaultProvisioned false.' },
      { id: 'C-PF-19', description: 'Secret real permanece não escrito.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'secretWritten false.' },
      { id: 'C-PF-20', description: 'Certificado real permanece não carregado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'certificateLoaded false.' },
      { id: 'C-PF-21', description: 'SEFAZ real permanece não chamada.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realSefazCalled false.' },
      { id: 'C-PF-22', description: 'XML real permanece não assinado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realXmlSigned false.' },
      { id: 'C-PF-23', description: 'PDF real permanece não gerado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'realPdfGenerated false.' },
      { id: 'C-PF-24', description: 'Produção V2 permanece desativada.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'productionV2Activated false.' },
      { id: 'C-PF-25', description: 'Tráfego real permanece inalterado.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'trafficChanged false.' },
      { id: 'C-PF-26', description: 'Worker/scheduler permanece inexistente.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'workersCreated false.' },
      { id: 'C-PF-27', description: 'DML fiscal real permanece inexistente.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'No database inserts.' },
      { id: 'C-PF-28', description: 'Payload bruto não exposto.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'payloadIncluded false.' },
      { id: 'C-PF-29', description: 'Dado sensível não exposto.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'sensitiveDataIncluded false.' },
      { id: 'C-PF-30', description: 'Preflight review pode ser fechado documentalmente.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'Review OK.' },
      { id: 'C-PF-31', description: 'Execução real permanece bloqueada.', passed: true, blockerForPreflightClosure: false, blockerForRealExecution: true, evidence: 'approvedForRealExecutionAuthorization false.' }
    ];
  }
}
