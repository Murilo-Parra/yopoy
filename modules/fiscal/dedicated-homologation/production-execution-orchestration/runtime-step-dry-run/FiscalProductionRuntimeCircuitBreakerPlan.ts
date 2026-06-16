export class FiscalProductionRuntimeCircuitBreakerPlan {
  public static generatePlan() {
    return {
      circuitBreakerPlanGenerated: true,
      trafficChanged: false,
      productionV2Activated: false,
      description: 'Modelagem de circuit breaker documental. Não instala kill-switch real nem altera tráfego.'
    };
  }
}
