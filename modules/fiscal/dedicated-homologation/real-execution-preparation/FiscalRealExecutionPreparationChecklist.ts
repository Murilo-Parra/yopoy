export class FiscalRealExecutionPreparationChecklist {
  public static getChecklist() {
    return [
      { id: 'C-EP-01', description: 'Módulo 13 encerrado documentalmente.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'Module 13 closed.' },
      { id: 'C-EP-02', description: 'Gate real permanece bloqueado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'realExecutionGateUnlocked false.' },
      { id: 'C-EP-03', description: 'Execução real permanece não autorizada.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'realExecutionAuthorized false.' },
      { id: 'C-EP-04', description: 'Payload real permanece não executável.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'payloadExecutable false.' },
      { id: 'C-EP-05', description: 'IaC real permanece não aplicado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'iacApplied false.' },
      { id: 'C-EP-06', description: 'Terraform apply permanece não executado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'terraformApplied false.' },
      { id: 'C-EP-07', description: 'Pulumi up permanece não executado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'pulumiApplied false.' },
      { id: 'C-EP-08', description: 'Cloud deploy permanece não executado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'cloudFormationDeployed false.' },
      { id: 'C-EP-09', description: 'Banco real permanece não criado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'databaseProvisioned false.' },
      { id: 'C-EP-10', description: 'Vault real permanece não criado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'vaultProvisioned false.' },
      { id: 'C-EP-11', description: 'Secret real permanece não escrito.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'secretWritten false.' },
      { id: 'C-EP-12', description: 'Certificado real permanece não carregado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'certificateLoaded false.' },
      { id: 'C-EP-13', description: 'SEFAZ real permanece não chamada.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'realSefazCalled false.' },
      { id: 'C-EP-14', description: 'XML real permanece não assinado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'realXmlSigned false.' },
      { id: 'C-EP-15', description: 'PDF real permanece não gerado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'realPdfGenerated false.' },
      { id: 'C-EP-16', description: 'Produção V2 permanece desativada.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'productionV2Activated false.' },
      { id: 'C-EP-17', description: 'Tráfego real permanece inalterado.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'trafficChanged false.' },
      { id: 'C-EP-18', description: 'Worker/scheduler permanece inexistente.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'workersCreated false.' },
      { id: 'C-EP-19', description: 'DML fiscal real permanece inexistente.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'No database inserts.' },
      { id: 'C-EP-20', description: 'Payload bruto não exposto.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'payloadIncluded false.' },
      { id: 'C-EP-21', description: 'Dado sensível não exposto.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'sensitiveDataIncluded false.' },
      { id: 'C-EP-22', description: 'Envelope operacional pode ser gerado para simulação.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'Policies enforced.' },
      { id: 'C-EP-23', description: 'Execução real permanece bloqueada.', passed: true, blockerForPreparationClosure: false, blockerForRealExecution: true, evidence: 'approvedForRealExecutionAuthorization false.' }
    ];
  }
}
