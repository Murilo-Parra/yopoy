import { FiscalLoadPlanningClosureGuardrail } from './FiscalLoadPlanningClosureTypes';

export class FiscalLoadPlanningClosureGuardrails {
  public static getChecklist(): FiscalLoadPlanningClosureGuardrail[] {
    return [
      { id: 'LP-G-01', name: 'Canary real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCanary: false everywhere', blockerForRealLoad: true },
      { id: 'LP-G-02', name: 'Real load test continua desativado', passed: true, severity: 'CRITICAL', evidence: 'loadExecuted: false, approvedForRealLoadTest: false', blockerForRealLoad: true },
      { id: 'LP-G-03', name: 'Real load runner continua desativado', passed: true, severity: 'CRITICAL', evidence: 'executionEnabled: false, executionStarted: false', blockerForRealLoad: true },
      { id: 'LP-G-04', name: 'Nenhum tráfego real foi gerado', passed: true, severity: 'CRITICAL', evidence: 'realTrafficGenerated: false', blockerForRealLoad: true },
      { id: 'LP-G-05', name: 'Nenhum endpoint real foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsRealEndpoint: false', blockerForRealLoad: true },
      { id: 'LP-G-06', name: 'Nenhuma rota legada foi removida', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealLoad: true },
      { id: 'LP-G-07', name: 'Nenhuma resposta legada foi alterada', passed: true, severity: 'CRITICAL', evidence: 'Handlers untouched', blockerForRealLoad: true },
      { id: 'LP-G-08', name: 'Nenhum app.use legado foi alterado', passed: true, severity: 'CRITICAL', evidence: 'server.ts unchanged', blockerForRealLoad: true },
      { id: 'LP-G-09', name: 'Nenhum middleware real foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealLoad: true },
      { id: 'LP-G-10', name: 'Nenhum tap real foi instalado', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealLoad: true },
      { id: 'LP-G-11', name: 'Nenhum worker automático existe', passed: true, severity: 'CRITICAL', evidence: 'workerCreated: false', blockerForRealLoad: true },
      { id: 'LP-G-12', name: 'Nenhum scheduler existe', passed: true, severity: 'CRITICAL', evidence: 'schedulerCreated: false', blockerForRealLoad: true },
      { id: 'LP-G-13', name: 'Nenhum cron/setInterval/queue.process existe', passed: true, severity: 'CRITICAL', evidence: 'Greps show absence', blockerForRealLoad: true },
      { id: 'LP-G-14', name: 'Nenhum handler legado foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsLegacyHandler: false', blockerForRealLoad: true },
      { id: 'LP-G-15', name: 'Nenhum handler V2 operacional foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsV2Handler: false', blockerForRealLoad: true },
      { id: 'LP-G-16', name: 'Nenhum SEFAZ foi acionado', passed: true, severity: 'CRITICAL', evidence: 'Blocked by Scenario Risk Classifier', blockerForRealLoad: true },
      { id: 'LP-G-17', name: 'Nenhum XML foi assinado', passed: true, severity: 'CRITICAL', evidence: 'Blocked by Scenario Risk Classifier', blockerForRealLoad: true },
      { id: 'LP-G-18', name: 'Nenhum PDF foi gerado', passed: true, severity: 'CRITICAL', evidence: 'Blocked by Scenario Risk Classifier', blockerForRealLoad: true },
      { id: 'LP-G-19', name: 'Nenhuma escrita em tabelas fiscais reais foi criada', passed: true, severity: 'CRITICAL', evidence: 'No DML executed', blockerForRealLoad: true },
      { id: 'LP-G-20', name: 'loadExecuted permanece false', passed: true, severity: 'CRITICAL', evidence: 'loadExecuted: false', blockerForRealLoad: true },
      { id: 'LP-G-21', name: 'executionEnabled permanece false', passed: true, severity: 'CRITICAL', evidence: 'executionEnabled: false', blockerForRealLoad: true },
      { id: 'LP-G-22', name: 'executionStarted permanece false', passed: true, severity: 'CRITICAL', evidence: 'executionStarted: false', blockerForRealLoad: true },
      { id: 'LP-G-23', name: 'realTrafficGenerated permanece false', passed: true, severity: 'CRITICAL', evidence: 'realTrafficGenerated: false', blockerForRealLoad: true },
      { id: 'LP-G-24', name: 'callsRealEndpoint permanece false', passed: true, severity: 'CRITICAL', evidence: 'callsRealEndpoint: false', blockerForRealLoad: true },
      { id: 'LP-G-25', name: 'callsLegacyHandler permanece false', passed: true, severity: 'CRITICAL', evidence: 'callsLegacyHandler: false', blockerForRealLoad: true },
      { id: 'LP-G-26', name: 'callsV2Handler permanece false', passed: true, severity: 'CRITICAL', evidence: 'callsV2Handler: false', blockerForRealLoad: true },
      { id: 'LP-G-27', name: 'routeToV2 permanece false', passed: true, severity: 'CRITICAL', evidence: 'routeToV2: false', blockerForRealLoad: true },
      { id: 'LP-G-28', name: 'routeToLegacy permanece true', passed: true, severity: 'CRITICAL', evidence: 'routeToLegacy: true', blockerForRealLoad: true },
      { id: 'LP-G-29', name: 'approvedForRealLoadTest permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealLoadTest: false', blockerForRealLoad: true },
      { id: 'LP-G-30', name: 'approvedForRealCanary permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCanary: false', blockerForRealLoad: true },
      { id: 'LP-G-31', name: 'approvedForProductionV2 permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForProductionV2: false', blockerForRealLoad: true },
      { id: 'LP-G-32', name: 'payloadIncluded permanece false', passed: true, severity: 'CRITICAL', evidence: 'payloadIncluded: false', blockerForRealLoad: true },
      { id: 'LP-G-33', name: 'sensitiveDataIncluded permanece false', passed: true, severity: 'CRITICAL', evidence: 'sensitiveDataIncluded: false', blockerForRealLoad: true },
      { id: 'LP-G-34', name: 'Boot Policy permanece preservada', passed: true, severity: 'CRITICAL', evidence: 'Build verified', blockerForRealLoad: true },
      { id: 'LP-G-35', name: 'Scripts temporários foram removidos ou justificados', passed: true, severity: 'INFO', evidence: 'Only administrative endpoints expose this data', blockerForRealLoad: false }
    ];
  }
}
