export class FiscalOperationalIncidentTriggerSimulation {
  public static generateSimulation() {
    return {
      incidentTriggerSimulationGenerated: true,
      realIncidentOpened: false,
      realTicketCreated: false,
      externalEndpointCalled: false,
      description: 'Simulation of incident triggers. No real incident opened. No real ticket created. No external endpoint called.'
    };
  }
}
