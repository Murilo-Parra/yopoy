export class FiscalProductionTrafficMutationProhibitionPlan {
  public static getPlan() {
    return {
      trafficMutationProhibitionPlanGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Modelar plano de proibição de mutação de tráfego. Não alterar routeToV2. Não alterar tráfego real. Preservar routeToLegacy: true.'
    };
  }
}
