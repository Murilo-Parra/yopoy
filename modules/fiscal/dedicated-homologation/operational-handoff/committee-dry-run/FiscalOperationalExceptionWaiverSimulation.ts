export class FiscalOperationalExceptionWaiverSimulation {
  public static generateSimulation() {
    return {
      exceptionWaiverSimulationGenerated: true,
      realWaiverGranted: false,
      description: 'Simulation of future exceptions/waivers. Any waiver attempting to activate production, SEFAZ, database, runbook or real observability is blocked.'
    };
  }
}
