import { FiscalShadowMirrorSimulationReport, FiscalShadowMirrorSimulationStatus } from './FiscalShadowMirrorSimulationTypes';

export class FiscalShadowMirrorSimulationReportService {
  private static totalSimulations = 0;
  private static totalBlocked = 0;
  private static totalSimulated = 0;
  private static byRoute: Record<string, number> = {};
  private static byRisk: Record<string, number> = {}; // Status actually

  public static recordSimulation(routeId: string, status: FiscalShadowMirrorSimulationStatus | string) {
    this.totalSimulations++;
    if (status === FiscalShadowMirrorSimulationStatus.SIMULATED) this.totalSimulated++;
    else this.totalBlocked++;

    this.byRoute[routeId] = (this.byRoute[routeId] || 0) + 1;
    this.byRisk[status] = (this.byRisk[status] || 0) + 1;
  }

  public static getReport(): FiscalShadowMirrorSimulationReport {
    return {
      generatedAt: new Date().toISOString(),
      totalSimulations: this.totalSimulations,
      totalBlocked: this.totalBlocked,
      totalSimulated: this.totalSimulated,
      byRoute: this.byRoute,
      byRisk: this.byRisk,
      manualOnly: true,
      syntheticOnly: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
