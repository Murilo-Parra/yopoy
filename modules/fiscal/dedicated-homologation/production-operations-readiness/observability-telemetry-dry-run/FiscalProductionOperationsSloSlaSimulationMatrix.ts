export class FiscalProductionOperationsSloSlaSimulationMatrix {
  public static getMatrix() {
    return {
      sloSlaSimulationMatrixGenerated: true,
      realSloSlaEvaluated: false,
      description: 'Modelar SLO/SLA de forma simulada. Não avaliar SLO/SLA real-time.'
    };
  }
}
