export class FiscalProductionTrafficReversionNoOpPlan {
  public static getPlan() {
    return {
      trafficReversionNoOpPlanGenerated: true,
      realTrafficReverted: false,
      trafficChanged: false,
      description: 'Modelar reversão de tráfego como no-op. Não alterar tráfego real.'
    };
  }
}
