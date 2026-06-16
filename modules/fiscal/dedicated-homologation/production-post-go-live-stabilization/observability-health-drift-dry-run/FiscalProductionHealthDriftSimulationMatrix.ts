export class FiscalProductionHealthDriftSimulationMatrix {
  public static getMatrix() {
    return {
      healthDriftSimulationMatrixGenerated: true,
      realTelemetryRead: false,
      realIncidentOpened: false,
      description: 'Modelar drift de saúde operacional apenas como simulação. Não ler telemetria real. Não abrir incidente real.'
    };
  }
}
