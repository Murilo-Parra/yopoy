import { FiscalDedicatedSimulationReport, FiscalDedicatedSimulationDomain } from './FiscalDedicatedSimulationTypes';
import { FiscalDedicatedSimulationHarness } from './FiscalDedicatedSimulationHarness';

export class FiscalDedicatedSimulationReportService {
  public static getReport(): FiscalDedicatedSimulationReport {
    const simulationResult = FiscalDedicatedSimulationHarness.executeSimulation({ domain: FiscalDedicatedSimulationDomain.FULL_STACK });

    return {
      generatedAt: new Date().toISOString(),
      results: [simulationResult],
      totals: { totalPassed: 0, totalFailed: 1 },
      blockedDomains: [FiscalDedicatedSimulationDomain.FULL_STACK],
      warnings: simulationResult.warnings,
      readOnly: true,
      simulationHarnessOnly: true,
      mockEnvironmentOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      ...simulationResult,
      blockers: [
        'Dedicated Homologation Simulation 11.3 é harness administrativo mockado. Runtime real, banco real, vault real, certificado real, SEFAZ real, XML real assinado, PDF real, workers e Produção V2 permanecem bloqueados.',
        'O Módulo 11.3 foi encerrado em modo read-only/simulation-harness-only/mock-environment-only/governance-only/simulation-only. Runtime real, banco real, vault real, certificado real, SEFAZ real, XML assinado, PDF real, workers, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
      ]
    };
  }
}
