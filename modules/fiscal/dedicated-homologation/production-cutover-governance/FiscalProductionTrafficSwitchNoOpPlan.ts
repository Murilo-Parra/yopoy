export class FiscalProductionTrafficSwitchNoOpPlan {
  public static getPlan() {
    return {
      trafficSwitchNoOpPlanGenerated: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Modelagem do switch de tráfego como no-op. Não direciona tráfego para V2. Não instala proxy/middleware/tap.'
    };
  }
}
