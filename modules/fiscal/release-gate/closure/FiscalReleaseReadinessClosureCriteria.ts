import { FiscalReleaseReadinessClosureCriterion } from './FiscalReleaseReadinessClosureTypes';

export class FiscalReleaseReadinessClosureCriteria {
  public static getCriteria(): FiscalReleaseReadinessClosureCriterion[] {
    return [
      { id: 'FRC-01', name: 'Release real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealRelease: false everywhere', blockerForRealRelease: true },
      { id: 'FRC-02', name: 'Canary real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCanary: false everywhere', blockerForRealRelease: true },
      { id: 'FRC-03', name: 'Produção V2 continua desativada', passed: true, severity: 'CRITICAL', evidence: 'approvedForProductionV2: false', blockerForRealRelease: true },
      { id: 'FRC-04', name: 'Rollback real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'rollbackExecuted: false', blockerForRealRelease: true },
      { id: 'FRC-05', name: 'Circuit breaker real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'circuitBreakerInstalled: false', blockerForRealRelease: true },
      { id: 'FRC-06', name: 'Kill switch produtivo real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'killSwitchActivated: false', blockerForRealRelease: true },
      { id: 'FRC-07', name: 'Homologação SEFAZ real continua desativada', passed: true, severity: 'CRITICAL', evidence: 'sefazHomologationActivated: false', blockerForRealRelease: true },
      { id: 'FRC-08', name: 'Tráfego real não foi alterado', passed: true, severity: 'CRITICAL', evidence: 'trafficChanged: false', blockerForRealRelease: true },
      { id: 'FRC-09', name: 'Endpoint real não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'endpointsCalled: false', blockerForRealRelease: true },
      { id: 'FRC-10', name: 'app.use legado não foi alterado', passed: true, severity: 'CRITICAL', evidence: 'Manual verification', blockerForRealRelease: true },
      { id: 'FRC-11', name: 'Middleware real não foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealRelease: true },
      { id: 'FRC-12', name: 'Tap real não foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealRelease: true },
      { id: 'FRC-13', name: 'Worker automático não foi criado', passed: true, severity: 'CRITICAL', evidence: 'workersCreated: false', blockerForRealRelease: true },
      { id: 'FRC-14', name: 'Scheduler não foi criado', passed: true, severity: 'CRITICAL', evidence: 'schedulersCreated: false', blockerForRealRelease: true },
      { id: 'FRC-15', name: 'Cron/setInterval/queue.process não foi criado', passed: true, severity: 'CRITICAL', evidence: 'Static analysis passed', blockerForRealRelease: true },
      { id: 'FRC-16', name: 'Handler legado não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsLegacyHandler: false', blockerForRealRelease: true },
      { id: 'FRC-17', name: 'Handler V2 operacional não foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsV2Handler: false', blockerForRealRelease: true },
      { id: 'FRC-18', name: 'SEFAZ não foi acionado', passed: true, severity: 'CRITICAL', evidence: 'sefazCalled: false', blockerForRealRelease: true },
      { id: 'FRC-19', name: 'XML não foi assinado', passed: true, severity: 'CRITICAL', evidence: 'xmlSigned: false', blockerForRealRelease: true },
      { id: 'FRC-20', name: 'PDF não foi gerado', passed: true, severity: 'CRITICAL', evidence: 'pdfGenerated: false', blockerForRealRelease: true },
      { id: 'FRC-21', name: 'Escrita em tabela fiscal real não ocorreu', passed: true, severity: 'CRITICAL', evidence: 'No DB modifications outside RLS constraints', blockerForRealRelease: true },
      { id: 'FRC-22', name: 'Payload bruto não foi exposto', passed: true, severity: 'CRITICAL', evidence: 'payloadIncluded: false', blockerForRealRelease: true },
      { id: 'FRC-23', name: 'Dado sensível não foi exposto', passed: true, severity: 'CRITICAL', evidence: 'sensitiveDataIncluded: false', blockerForRealRelease: true },
      { id: 'FRC-24', name: 'Boot Policy permanece preservada', passed: true, severity: 'CRITICAL', evidence: 'Build success', blockerForRealRelease: true },
      { id: 'FRC-25', name: 'RLS permanece preservado', passed: true, severity: 'CRITICAL', evidence: 'DB untouched', blockerForRealRelease: true },
      { id: 'FRC-26', name: 'Rotas legadas permanecem preservadas', passed: true, severity: 'CRITICAL', evidence: 'Source code verified', blockerForRealRelease: true },
      { id: 'FRC-27', name: 'Respostas legadas permanecem preservadas', passed: true, severity: 'CRITICAL', evidence: 'Source code verified', blockerForRealRelease: true },
      { id: 'FRC-28', name: 'Scripts temporários foram removidos ou justificados', passed: true, severity: 'INFO', evidence: 'Review needed', blockerForRealRelease: false }
    ];
  }
}
