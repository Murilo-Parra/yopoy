export class FiscalDedicatedReadinessCriteria {
  public static getCriteria() {
    return [
      { id: 'DH-01', name: 'Ambiente dedicado real não foi ativado', passed: true },
      { id: 'DH-02', name: 'Homologação real continua desativada', passed: true },
      { id: 'DH-03', name: 'SEFAZ real continua bloqueada', passed: true },
      { id: 'DH-04', name: 'Certificado real continua não carregado', passed: true },
      { id: 'DH-05', name: 'PFX real continua não lido', passed: true },
      { id: 'DH-06', name: 'Senha de certificado continua não lida', passed: true },
      { id: 'DH-07', name: 'XML real continua não assinado', passed: true },
      { id: 'DH-08', name: 'PDF real continua não gerado', passed: true },
      { id: 'DH-09', name: 'Release real continua desativado', passed: true },
      { id: 'DH-10', name: 'Canary real continua desativado', passed: true },
      { id: 'DH-11', name: 'Produção V2 continua desativada', passed: true },
      { id: 'DH-12', name: 'Tráfego real não foi alterado', passed: true },
      { id: 'DH-13', name: 'Endpoint real não foi chamado', passed: true },
      { id: 'DH-14', name: 'app.use legado não foi alterado', passed: true },
      { id: 'DH-15', name: 'Middleware real não foi instalado', passed: true },
      { id: 'DH-16', name: 'Tap real não foi instalado', passed: true },
      { id: 'DH-17', name: 'Worker automático não foi criado', passed: true },
      { id: 'DH-18', name: 'Scheduler não foi criado', passed: true },
      { id: 'DH-19', name: 'Cron/setInterval/queue.process não foi criado', passed: true },
      { id: 'DH-20', name: 'Handler legado não foi chamado', passed: true },
      { id: 'DH-21', name: 'Handler V2 operacional não foi chamado', passed: true },
      { id: 'DH-22', name: 'Escrita em tabela fiscal real não ocorreu', passed: true },
      { id: 'DH-23', name: 'Payload bruto não foi exposto', passed: true },
      { id: 'DH-24', name: 'Dado sensível não foi exposto', passed: true },
      { id: 'DH-25', name: 'Boot Policy permanece preservada', passed: true },
      { id: 'DH-26', name: 'RLS permanece preservado', passed: true },
      { id: 'DH-27', name: 'Rotas legadas permanecem preservadas', passed: true },
      { id: 'DH-28', name: 'Respostas legadas permanecem preservadas', passed: true },
      { id: 'DH-29', name: 'Scripts temporários foram removidos ou justificados', passed: true }
    ];
  }
}
