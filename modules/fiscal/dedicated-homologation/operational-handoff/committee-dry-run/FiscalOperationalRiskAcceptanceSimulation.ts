export class FiscalOperationalRiskAcceptanceSimulation {
  public static generateSimulation() {
    return {
      riskAcceptanceSimulationGenerated: true,
      realRiskAccepted: false,
      description: 'Simulation of risk acceptance. Does not grant operational authorization. Does not alter gate.'
    };
  }
}
