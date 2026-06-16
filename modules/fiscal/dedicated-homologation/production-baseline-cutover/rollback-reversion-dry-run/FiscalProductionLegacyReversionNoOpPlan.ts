export class FiscalProductionLegacyReversionNoOpPlan {
  public static getPlan() {
    return {
      legacyReversionNoOpPlanGenerated: true,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Modelagem reversão para legado como no-op. Manter legado obrigatório. Não alterar tráfego real.'
    };
  }
}
