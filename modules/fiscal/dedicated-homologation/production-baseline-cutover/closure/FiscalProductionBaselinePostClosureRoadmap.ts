export class FiscalProductionBaselinePostClosureRoadmap {
  public static getRoadmap() {
    return {
      postClosureRoadmapGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Roadmap pós-closure. Nenhuma execução real. Produção V2 não ativada.'
    };
  }
}
