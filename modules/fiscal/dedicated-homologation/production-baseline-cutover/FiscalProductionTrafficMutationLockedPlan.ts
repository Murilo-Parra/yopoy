export class FiscalProductionTrafficMutationLockedPlan {
  public static getPlan() {
    return {
      trafficMutationLockedPlanGenerated: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Declara mutação de tráfego bloqueada. Não instala proxy, middleware ou tap.'
    };
  }
}
