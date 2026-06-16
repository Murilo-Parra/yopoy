export class FiscalRealUnlockEligibilityChecklist {
  public static getChecklist() {
    return [
      { id: 'C-EUC-01', description: 'Módulo 12 encerrado documentalmente.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'Module 12 closed.' },
      { id: 'C-EUC-02', description: 'Módulo 13.1 Execution Gate criado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'Execution gate policy present.' },
      { id: 'C-EUC-03', description: 'Gate real permanece bloqueado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realExecutionGateUnlocked false.' },
      { id: 'C-EUC-04', description: 'Execução real permanece não autorizada.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realExecutionAuthorized false.' },
      { id: 'C-EUC-05', description: 'Janela real permanece não aberta.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realChangeWindowOpened false.' },
      { id: 'C-EUC-06', description: 'IaC real permanece não aplicado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'iacApplied false.' },
      { id: 'C-EUC-07', description: 'Terraform apply permanece não executado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'terraformApplied false.' },
      { id: 'C-EUC-08', description: 'Pulumi up permanece não executado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'pulumiApplied false.' },
      { id: 'C-EUC-09', description: 'Cloud deploy permanece não executado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'cloudFormationDeployed false.' },
      { id: 'C-EUC-10', description: 'Banco real permanece não criado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'databaseProvisioned false.' },
      { id: 'C-EUC-11', description: 'Vault real permanece não criado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'vaultProvisioned false.' },
      { id: 'C-EUC-12', description: 'Secret real permanece não escrito.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'secretWritten false.' },
      { id: 'C-EUC-13', description: 'Certificado real permanece não carregado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'certificateLoaded false.' },
      { id: 'C-EUC-14', description: 'SEFAZ real permanece não chamada.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realSefazCalled false.' },
      { id: 'C-EUC-15', description: 'XML real permanece não assinado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realXmlSigned false.' },
      { id: 'C-EUC-16', description: 'PDF real permanece não gerado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'realPdfGenerated false.' },
      { id: 'C-EUC-17', description: 'Produção V2 permanece desativada.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'productionV2Activated false.' },
      { id: 'C-EUC-18', description: 'Tráfego real permanece inalterado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'trafficChanged false.' },
      { id: 'C-EUC-19', description: 'Worker/scheduler permanece inexistente.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'workersCreated false.' },
      { id: 'C-EUC-20', description: 'DML fiscal real permanece inexistente.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'No database inserts.' },
      { id: 'C-EUC-21', description: 'Payload bruto não exposto.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'payloadIncluded false.' },
      { id: 'C-EUC-22', description: 'Dado sensível não exposto.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'sensitiveDataIncluded false.' },
      { id: 'C-EUC-23', description: 'Dupla aprovação simulada pode ser avaliada.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'Policies enforced.' },
      { id: 'C-EUC-24', description: 'Destravamento real permanece bloqueado.', passed: true, blockerForSimulationClosure: false, blockerForRealUnlock: true, evidence: 'approvedForGateUnlock false.' }
    ];
  }
}
