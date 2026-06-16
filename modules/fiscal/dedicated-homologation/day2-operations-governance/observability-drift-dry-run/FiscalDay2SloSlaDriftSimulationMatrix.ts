export class FiscalDay2SloSlaDriftSimulationMatrix {
  public static getMatrix() {
    return {
      sloSlaDriftSimulationMatrixGenerated: true,
      realSloSlaEvaluated: false,
      realIncidentOpened: false,
      description: 'Modelagem de matriz simulada de drift SLO/SLA. Não avalia SLO/SLA real. Não abre incidente real.'
    };
  }
}
