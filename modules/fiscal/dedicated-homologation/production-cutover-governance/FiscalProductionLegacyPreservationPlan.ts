export class FiscalProductionLegacyPreservationPlan {
  public static getPlan() {
    return {
      legacyPreservationPlanGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Preservação explícita do legado como rota obrigatória. Não desativa rota legada.'
    };
  }
}
