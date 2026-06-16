export class FiscalProductionLegacyContinuityDuringRollbackPlan {
  public static getPlan() {
    return {
      legacyContinuityDuringRollbackPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Modelar continuidade do legado durante rollback. Preservar routeToLegacy true.'
    };
  }
}
