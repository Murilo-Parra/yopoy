export class FiscalProductionLegacyContinuityPostGoLivePlan {
  public static getPlan() {
    return {
      legacyContinuityPostGoLivePlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Preservar legado como rota mandatória. Não desabilitar legado.'
    };
  }
}
