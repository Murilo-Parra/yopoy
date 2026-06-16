export class FiscalProductionLegacyContinuityDuringGoLivePlan {
  public static getPlan() {
    return {
      legacyContinuityDuringGoLivePlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Preservar o legado durante a simulação.'
    };
  }
}
