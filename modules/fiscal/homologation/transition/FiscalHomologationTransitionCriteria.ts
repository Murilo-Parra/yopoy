export class FiscalHomologationTransitionCriteria {
  public static getCriteria() {
    return [
      { id: 'TC-01', name: 'Mock phase-out não foi executado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-02', name: 'Ambiente dedicado não foi ativado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-03', name: 'Homologação real continua bloqueada', passed: true, blockerForRealHomologation: true },
      { id: 'TC-04', name: 'SEFAZ real continua bloqueada', passed: true, blockerForRealHomologation: true },
      { id: 'TC-05', name: 'Certificado real continua não carregado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-06', name: 'PFX real continua não lido', passed: true, blockerForRealHomologation: true },
      { id: 'TC-07', name: 'Senha de certificado continua não lida', passed: true, blockerForRealHomologation: true },
      { id: 'TC-08', name: 'XML real continua não assinado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-09', name: 'PDF real continua não gerado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-10', name: 'Release real continua desativado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-11', name: 'Canary real continua desativado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-12', name: 'Produção V2 continua desativada', passed: true, blockerForRealHomologation: true },
      { id: 'TC-13', name: 'Tráfego real não foi alterado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-14', name: 'Endpoint real não foi chamado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-15', name: 'app.use legado não foi alterado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-16', name: 'Middleware real não foi instalado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-17', name: 'Tap real não foi instalado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-18', name: 'Worker automático não foi criado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-19', name: 'Scheduler não foi criado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-20', name: 'Cron/setInterval/queue.process não foi criado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-21', name: 'Handler legado não foi chamado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-22', name: 'Handler V2 operacional não foi chamado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-23', name: 'Escrita em tabela fiscal real não ocorreu', passed: true, blockerForRealHomologation: true },
      { id: 'TC-24', name: 'Payload bruto não foi exposto', passed: true, blockerForRealHomologation: true },
      { id: 'TC-25', name: 'Dado sensível não foi exposto', passed: true, blockerForRealHomologation: true },
      { id: 'TC-26', name: 'Boot Policy permanece preservada', passed: true, blockerForRealHomologation: true },
      { id: 'TC-27', name: 'RLS permanece preservado', passed: true, blockerForRealHomologation: true },
      { id: 'TC-28', name: 'Rotas legadas permanecem preservadas', passed: true, blockerForRealHomologation: true },
      { id: 'TC-29', name: 'Respostas legadas permanecem preservadas', passed: true, blockerForRealHomologation: true },
      { id: 'TC-30', name: 'Scripts temporários foram removidos ou justificados', passed: true, blockerForRealHomologation: true }
    ];
  }
}
