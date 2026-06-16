export class FiscalProductionLegacyContinuityDuringAbortPlan {
  public static getPlan() {
    return {
      legacyContinuityDuringAbortPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      productionV2Activated: false,
      description: 'Preservação do legado como rota contínua durante abort simulado. Não desativa legado. Não ativa V2.'
    };
  }
}
