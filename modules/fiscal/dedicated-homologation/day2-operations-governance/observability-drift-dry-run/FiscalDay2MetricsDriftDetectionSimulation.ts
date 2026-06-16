export class FiscalDay2MetricsDriftDetectionSimulation {
  public static getSimulation() {
    return {
      metricsDriftDetectionSimulationGenerated: true,
      realSloSlaEvaluated: false,
      productionAlertCreated: false,
      realAlertRuleActivated: false,
      description: 'Modelagem de detecção de drift de métricas como simulação. Não avalia métrica real. Não aciona alerta real.'
    };
  }
}
