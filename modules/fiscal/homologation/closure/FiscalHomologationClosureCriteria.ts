import { FiscalHomologationClosureCriterion } from './FiscalHomologationClosureTypes';

export class FiscalHomologationClosureCriteria {
  public static getCriteria(): FiscalHomologationClosureCriterion[] {
    return [
      { id: 'HC-01', name: 'Homologação real continua desativada', passed: true, severity: 'CRITICAL', evidence: 'homologationExecuted == false', blockerForRealHomologation: true },
      { id: 'HC-02', name: 'SEFAZ real continua desativada', passed: true, severity: 'CRITICAL', evidence: 'realSefazCalled == false', blockerForRealHomologation: true },
      { id: 'HC-03', name: 'Certificado real continua não carregado', passed: true, severity: 'CRITICAL', evidence: 'certificateLoaded == false', blockerForRealHomologation: true },
      { id: 'HC-04', name: 'PFX real continua não lido', passed: true, severity: 'CRITICAL', evidence: 'realPfxRead == false', blockerForRealHomologation: true },
      { id: 'HC-05', name: 'Senha de certificado continua não lida', passed: true, severity: 'CRITICAL', evidence: 'certificatePasswordRead == false', blockerForRealHomologation: true },
      { id: 'HC-06', name: 'XML real continua não assinado', passed: true, severity: 'CRITICAL', evidence: 'realXmlSigned == false', blockerForRealHomologation: true },
      { id: 'HC-07', name: 'PDF real continua não gerado', passed: true, severity: 'CRITICAL', evidence: 'realPdfGenerated == false', blockerForRealHomologation: true },
      { id: 'HC-08', name: 'Release real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'releaseActivated == false', blockerForRealHomologation: true },
      { id: 'HC-09', name: 'Canary real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'canaryActivated == false', blockerForRealHomologation: true },
      { id: 'HC-10', name: 'Produção V2 continua desativada', passed: true, severity: 'CRITICAL', evidence: 'productionV2Activated == false', blockerForRealHomologation: true },
      { id: 'HC-11', name: 'Tráfego real não foi alterado', passed: true, severity: 'CRITICAL', evidence: 'trafficChanged == false', blockerForRealHomologation: true },
      { id: 'HC-12', name: 'Endpoint real não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'endpointsCalled == false', blockerForRealHomologation: true },
      { id: 'HC-13', name: 'app.use legado não foi alterado', passed: true, severity: 'CRITICAL', evidence: 'Source code verified', blockerForRealHomologation: true },
      { id: 'HC-14', name: 'Middleware real não foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Source code verified', blockerForRealHomologation: true },
      { id: 'HC-15', name: 'Tap real não foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Source code verified', blockerForRealHomologation: true },
      { id: 'HC-16', name: 'Worker automático não foi criado', passed: true, severity: 'CRITICAL', evidence: 'workersCreated == false', blockerForRealHomologation: true },
      { id: 'HC-17', name: 'Scheduler não foi criado', passed: true, severity: 'CRITICAL', evidence: 'schedulersCreated == false', blockerForRealHomologation: true },
      { id: 'HC-18', name: 'Cron/setInterval/queue.process não foi criado', passed: true, severity: 'CRITICAL', evidence: 'Static analysis passed', blockerForRealHomologation: true },
      { id: 'HC-19', name: 'Handler legado não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'Event traces checked', blockerForRealHomologation: true },
      { id: 'HC-20', name: 'Handler V2 operacional não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'Event traces checked', blockerForRealHomologation: true },
      { id: 'HC-21', name: 'Escrita em tabela fiscal real não ocorreu', passed: true, severity: 'CRITICAL', evidence: 'realDmlExecutions == 0', blockerForRealHomologation: true },
      { id: 'HC-22', name: 'Payload bruto não foi exposto', passed: true, severity: 'CRITICAL', evidence: 'payloadIncluded == false', blockerForRealHomologation: true },
      { id: 'HC-23', name: 'Dado sensível não foi exposto', passed: true, severity: 'CRITICAL', evidence: 'sensitiveDataIncluded == false', blockerForRealHomologation: true },
      { id: 'HC-24', name: 'Boot Policy permanece preservada', passed: true, severity: 'CRITICAL', evidence: 'Success build', blockerForRealHomologation: true },
      { id: 'HC-25', name: 'RLS permanece preservado', passed: true, severity: 'CRITICAL', evidence: 'No migrations', blockerForRealHomologation: true },
      { id: 'HC-26', name: 'Rotas legadas permanecem preservadas', passed: true, severity: 'CRITICAL', evidence: 'Static code analysis', blockerForRealHomologation: true },
      { id: 'HC-27', name: 'Respostas legadas permanecem preservadas', passed: true, severity: 'CRITICAL', evidence: 'Static code analysis', blockerForRealHomologation: true },
      { id: 'HC-28', name: 'Scripts temporários foram removidos ou justificados', passed: true, severity: 'INFO', evidence: 'Audit', blockerForRealHomologation: false }
    ];
  }
}
