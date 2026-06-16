import { FiscalDedicatedReplayReport, FiscalDedicatedReplayDomain } from './FiscalDedicatedReplayTypes';
import { FiscalDedicatedReplayQueueRepository } from './FiscalDedicatedReplayQueueRepository';

export class FiscalDedicatedReplayReportService {
  public static getReport(): FiscalDedicatedReplayReport {
    return {
      generatedAt: new Date().toISOString(),
      queueSummary: {
         totalInQueue: FiscalDedicatedReplayQueueRepository.getQueue().length
      },
      results: [],
      totals: { totalQueued: FiscalDedicatedReplayQueueRepository.getQueue().length },
      blockedDomains: [FiscalDedicatedReplayDomain.FULL_STACK],
      warnings: [],
      readOnly: true,
      replayHarnessOnly: true,
      syntheticReplayOnly: true,
      mockEnvironmentOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      blockers: [
        'Dedicated Homologation Replay 11.4 é harness administrativo sintético. Replay real, tráfego real, endpoint real, handler real, certificado real, SEFAZ real, XML real assinado, PDF real, workers e Produção V2 permanecem bloqueados.',
        'O Módulo 11.4 foi encerrado em modo read-only/replay-harness-only/synthetic-replay-only/mock-environment-only/governance-only/simulation-only. Replay real, tráfego real, endpoint real, handler real, certificado real, SEFAZ real, XML assinado, PDF real, workers, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
      ]
    };
  }
}
