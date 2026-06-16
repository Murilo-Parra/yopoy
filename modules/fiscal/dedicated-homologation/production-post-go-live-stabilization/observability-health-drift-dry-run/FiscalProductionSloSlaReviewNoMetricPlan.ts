export class FiscalProductionSloSlaReviewNoMetricPlan {
  public static getPlan() {
    return {
      sloSlaReviewNoMetricPlanGenerated: true,
      realSloSlaEvaluated: false,
      realMetricsCaptured: false,
      description: 'Modelar revisão de SLO/SLA sem métricas reais. Não avaliar SLO/SLA real-time.'
    };
  }
}
