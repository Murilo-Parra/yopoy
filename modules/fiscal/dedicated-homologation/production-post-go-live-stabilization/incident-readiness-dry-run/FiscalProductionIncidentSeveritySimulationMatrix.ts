export class FiscalProductionIncidentSeveritySimulationMatrix {
  public static getMatrix() {
    return {
      incidentSeveritySimulationMatrixGenerated: true,
      realAlertCreated: false,
      realIncidentOpened: false,
      description: 'Modelar severidade apenas como classificação simulada. Não criar alerta produtivo real. Não abrir incidente real.'
    };
  }
}
