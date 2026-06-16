export class FiscalProductionCompliancePostClosureRoadmap {
  public static getRoadmap() {
    return {
      postClosureRoadmapGenerated: true,
      productionV2Activated: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modelar próximos passos sem ativação. Manter routeToV2 false. Manter routeToLegacy true.'
    };
  }
}
