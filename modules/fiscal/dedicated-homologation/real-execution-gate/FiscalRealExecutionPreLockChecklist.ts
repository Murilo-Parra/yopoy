export class FiscalRealExecutionPreLockChecklist {
  public static getChecklist() {
    return [
      { id: 'C-EGL-01', description: 'Todos os módulos 12.* fechados documentalmente.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'Module 12.5 closed.' },
      { id: 'C-EGL-02', description: 'Nenhuma autorização real concedida pelo módulo 12.5.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realExecutionAuthorized false.' },
      { id: 'C-EGL-03', description: 'Nenhuma janela real aberta.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realChangeWindowOpened false.' },
      { id: 'C-EGL-04', description: 'Nenhuma execução real iniciada.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realExecutionStarted false.' },
      { id: 'C-EGL-05', description: 'Nenhum IaC aplicado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'iacApplied false.' },
      { id: 'C-EGL-06', description: 'Nenhum terraform apply executado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'terraformApplied false.' },
      { id: 'C-EGL-07', description: 'Nenhum pulumi up executado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'pulumiApplied false.' },
      { id: 'C-EGL-08', description: 'Nenhum cloud deploy executado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'cloudFormationDeployed false.' },
      { id: 'C-EGL-09', description: 'Nenhum recurso cloud real criado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realResourceCreated false.' },
      { id: 'C-EGL-10', description: 'Nenhum banco real criado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'databaseProvisioned false.' },
      { id: 'C-EGL-11', description: 'Nenhum banco real conectado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realDatabaseConnected false.' },
      { id: 'C-EGL-12', description: 'Nenhum vault real criado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'vaultProvisioned false.' },
      { id: 'C-EGL-13', description: 'Nenhum secret real escrito.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'secretWritten false.' },
      { id: 'C-EGL-14', description: 'Nenhum certificado real carregado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'certificateLoaded false.' },
      { id: 'C-EGL-15', description: 'Nenhum PFX real lido.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realPfxRead false.' },
      { id: 'C-EGL-16', description: 'Nenhuma senha de certificado lida.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'certificatePasswordRead false.' },
      { id: 'C-EGL-17', description: 'Nenhuma SEFAZ real chamada.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realSefazCalled false.' },
      { id: 'C-EGL-18', description: 'Nenhum XML real assinado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realXmlSigned false.' },
      { id: 'C-EGL-19', description: 'Nenhum PDF real gerado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'realPdfGenerated false.' },
      { id: 'C-EGL-20', description: 'Nenhuma Produção V2 ativada.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'productionV2Activated false.' },
      { id: 'C-EGL-21', description: 'Nenhum tráfego real alterado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'trafficChanged false.' },
      { id: 'C-EGL-22', description: 'Nenhum endpoint real chamado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'endpointCalled false.' },
      { id: 'C-EGL-23', description: 'Nenhum handler legado chamado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'Legacy flag false.' },
      { id: 'C-EGL-24', description: 'Nenhum handler V2 operacional chamado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'V2 flags false.' },
      { id: 'C-EGL-25', description: 'Nenhum worker criado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'workersCreated false.' },
      { id: 'C-EGL-26', description: 'Nenhum scheduler/cron/setInterval/queue.process criado.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'schedulersCreated false.' },
      { id: 'C-EGL-27', description: 'Nenhum DML real ocorreu.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'Database safe.' },
      { id: 'C-EGL-28', description: 'Gate pode ser validado e fechado documentalmente.', passed: true, blockerForGateClosure: false, blockerForRealExecution: true, evidence: 'approvedForExecutionGateClosure true.' }
    ];
  }
}
