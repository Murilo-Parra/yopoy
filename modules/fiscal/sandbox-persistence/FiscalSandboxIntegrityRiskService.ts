import { FiscalSandboxIntegrityIssue, FiscalSandboxQualityScore } from './FiscalSandboxIntegrityTypes';

export class FiscalSandboxIntegrityRiskService {
  
  public evaluateRisks(scoreData: FiscalSandboxQualityScore, sourceCounts: Record<string, number>, routeCounts: Record<string, number>): FiscalSandboxIntegrityIssue[] {
     const issues: FiscalSandboxIntegrityIssue[] = [];

     if (scoreData.totalSnapshots < 10) {
        issues.push({
           id: 'R-SBX-01',
           type: 'DATA_VOLUME',
           severity: 'HIGH',
           count: scoreData.totalSnapshots,
           description: 'Amostra insuficiente no sandbox.',
           recommendation: 'Necessário processar mais requisições no sandbox antes de promover.',
           blockerForRealActivation: true
        });
     }

     if (scoreData.incompleteSnapshots > 0) {
        issues.push({
           id: 'R-SBX-02',
           type: 'DATA_QUALITY',
           severity: 'CRITICAL',
           count: scoreData.incompleteSnapshots,
           description: 'Existem snapshots com formato (safe_shape) incompleto ou vazio.',
           recommendation: 'Revisar os parsers no Replay Bridge ou Capture.',
           blockerForRealActivation: true
        });
     }

     if (scoreData.duplicateCandidates > (scoreData.totalSnapshots * 0.5)) {
        issues.push({
           id: 'R-SBX-03',
           type: 'DATA_QUALITY',
           severity: 'MEDIUM',
           count: scoreData.duplicateCandidates,
           description: 'Alto volume de eventos duplicados logicamente no sandbox.',
           recommendation: 'Revisar se o runner em batch está gerando repetição acidental.',
           blockerForRealActivation: false
        });
     }

     if (scoreData.expiredSnapshots > 0) {
         issues.push({
           id: 'R-SBX-04',
           type: 'RETENTION',
           severity: 'LOW',
           count: scoreData.expiredSnapshots,
           description: 'Snapshots antigos passaram do TTL recomendado (7 dias).',
           recommendation: 'Executar limpeza (cleanup) manual para manter o sandbox enxuto.',
           blockerForRealActivation: false
        });
     }

     if (scoreData.blockedSnapshots > 0) {
         issues.push({
           id: 'R-SBX-05',
           type: 'SAFETY',
           severity: 'CRITICAL',
           count: scoreData.blockedSnapshots,
           description: 'Snapshots flaggados como BLOCKED_FOR_SAFETY indicam violação de segurança ou falha crítica de roteamento.',
           recommendation: 'Revisar logs de auditoria e corrigir a causa-raiz imediatamente.',
           blockerForRealActivation: true
        });
     }

     const numRoutes = Object.keys(routeCounts).length;
     if (scoreData.totalSnapshots > 0 && numRoutes < 2) {
         issues.push({
           id: 'R-SBX-06',
           type: 'COVERAGE',
           severity: 'MEDIUM',
           count: numRoutes,
           description: 'Baixa diversidade de rotas testadas.',
           recommendation: 'Simular chamadas para outras rotas (ex: /emissao, /cancelamento).',
           blockerForRealActivation: false
        });
     }

     // Simulated risk indicating we lack full real connections enabled at this phase.
     issues.push({
         id: 'R-SBX-09',
         type: 'ARCHITECTURE',
         severity: 'CRITICAL',
         count: 1,
         description: 'Sandbox está totalmente isolado e não transmite para SEFAZ real.',
         recommendation: 'Isto é o comportamento esperado desta fase. Ativação de SEFAZ e assinatura bloqueadas por design.',
         blockerForRealActivation: true
     });

     return issues;
  }
}
