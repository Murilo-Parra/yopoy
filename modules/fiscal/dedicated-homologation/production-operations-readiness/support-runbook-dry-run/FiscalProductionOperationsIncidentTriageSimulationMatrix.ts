export class FiscalProductionOperationsIncidentTriageSimulationMatrix {
  public static getMatrix() {
    return {
      incidentTriageSimulationMatrixGenerated: true,
      realIncidentOpened: false,
      realEndpointCalled: false,
      description: 'Modelar triagem de incidente sem abrir incidente real.'
    };
  }
}
