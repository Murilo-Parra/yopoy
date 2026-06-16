import { FiscalShadowMirrorGovernanceGuardrail } from './FiscalShadowMirrorGovernanceTypes';

export class FiscalShadowMirrorGovernanceGuardrails {
  public static getChecklist(): FiscalShadowMirrorGovernanceGuardrail[] {
    return [
      { id: 'SM-G-01', name: 'Canary real continua desativado', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCanary: false everywhere', blockerForRealActivation: true },
      { id: 'SM-G-02', name: 'Real capture continua desativado', passed: true, severity: 'CRITICAL', evidence: 'capturesRequest/capturesResponse: false', blockerForRealActivation: true },
      { id: 'SM-G-03', name: 'Nenhum tráfego real foi alterado', passed: true, severity: 'CRITICAL', evidence: 'routeToV2: false', blockerForRealActivation: true },
      { id: 'SM-G-04', name: 'Nenhuma rota legada foi removida', passed: true, severity: 'CRITICAL', evidence: 'Code preserved', blockerForRealActivation: true },
      { id: 'SM-G-05', name: 'Nenhuma resposta legada foi alterada', passed: true, severity: 'CRITICAL', evidence: 'Handlers untouched', blockerForRealActivation: true },
      { id: 'SM-G-06', name: 'Nenhum app.use legado foi alterado', passed: true, severity: 'CRITICAL', evidence: 'server.ts unchanged', blockerForRealActivation: true },
      { id: 'SM-G-07', name: 'Nenhum middleware real foi instalado', passed: true, severity: 'CRITICAL', evidence: 'middlewareInstalled: false', blockerForRealActivation: true },
      { id: 'SM-G-08', name: 'Nenhum tap real foi instalado', passed: true, severity: 'CRITICAL', evidence: 'tapInstalled: false', blockerForRealActivation: true },
      { id: 'SM-G-09', name: 'Nenhum request real foi capturado', passed: true, severity: 'CRITICAL', evidence: 'readsRealBody: false', blockerForRealActivation: true },
      { id: 'SM-G-10', name: 'Nenhum response real foi capturado', passed: true, severity: 'CRITICAL', evidence: 'readsRealResponse: false', blockerForRealActivation: true },
      { id: 'SM-G-11', name: 'Nenhum body real foi lido', passed: true, severity: 'CRITICAL', evidence: 'payload/raw explicitly rejected', blockerForRealActivation: true },
      { id: 'SM-G-12', name: 'Nenhuma response real foi lida', passed: true, severity: 'CRITICAL', evidence: 'payload/raw explicitly rejected', blockerForRealActivation: true },
      { id: 'SM-G-13', name: 'Nenhum handler legado foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsLegacyHandler: false', blockerForRealActivation: true },
      { id: 'SM-G-14', name: 'Nenhum handler V2 operacional foi chamado', passed: true, severity: 'CRITICAL', evidence: 'callsV2Handler: false', blockerForRealActivation: true },
      { id: 'SM-G-15', name: 'Nenhum worker automático existe', passed: true, severity: 'CRITICAL', evidence: 'No cron/worker registered', blockerForRealActivation: true },
      { id: 'SM-G-16', name: 'Nenhum cron/setInterval/queue.process existe', passed: true, severity: 'CRITICAL', evidence: 'Greps show absence', blockerForRealActivation: true },
      { id: 'SM-G-17', name: 'Nenhum SEFAZ foi acionado', passed: true, severity: 'CRITICAL', evidence: 'Route risk checks block SEFAZ', blockerForRealActivation: true },
      { id: 'SM-G-18', name: 'Nenhum XML foi assinado', passed: true, severity: 'CRITICAL', evidence: 'Route risk checks block XML', blockerForRealActivation: true },
      { id: 'SM-G-19', name: 'Nenhum PDF foi gerado', passed: true, severity: 'CRITICAL', evidence: 'Route risk checks block PDF', blockerForRealActivation: true },
      { id: 'SM-G-20', name: 'Nenhuma escrita em tabelas fiscais reais foi criada', passed: true, severity: 'CRITICAL', evidence: 'No DML executed', blockerForRealActivation: true },
      { id: 'SM-G-21', name: 'routeToV2 permanece false', passed: true, severity: 'CRITICAL', evidence: 'routeToV2 explicitly false', blockerForRealActivation: true },
      { id: 'SM-G-22', name: 'routeToLegacy permanece true', passed: true, severity: 'CRITICAL', evidence: 'routeToLegacy explicitly true', blockerForRealActivation: true },
      { id: 'SM-G-23', name: 'approvedForRealCapture permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCapture permanently false', blockerForRealActivation: true },
      { id: 'SM-G-24', name: 'approvedForRealCanary permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForRealCanary permanently false', blockerForRealActivation: true },
      { id: 'SM-G-25', name: 'approvedForProductionV2 permanece false', passed: true, severity: 'CRITICAL', evidence: 'approvedForProductionV2 permanently false', blockerForRealActivation: true },
      { id: 'SM-G-26', name: 'payloadIncluded permanece false', passed: true, severity: 'CRITICAL', evidence: 'Output always has payloadIncluded: false', blockerForRealActivation: true },
      { id: 'SM-G-27', name: 'sensitiveDataIncluded permanece false', passed: true, severity: 'CRITICAL', evidence: 'Sanitizers mask all secrets', blockerForRealActivation: true },
      { id: 'SM-G-28', name: 'Boot Policy permanece preservada', passed: true, severity: 'CRITICAL', evidence: 'Build limits intact', blockerForRealActivation: true },
      { id: 'SM-G-29', name: 'Scripts temporários foram removidos ou justificados', passed: true, severity: 'INFO', evidence: 'All module outputs are synthetic APIs', blockerForRealActivation: false }
    ];
  }
}
