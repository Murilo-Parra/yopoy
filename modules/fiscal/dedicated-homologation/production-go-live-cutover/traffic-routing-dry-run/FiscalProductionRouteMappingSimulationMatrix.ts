export class FiscalProductionRouteMappingSimulationMatrix {
  public static getMatrix() {
    return {
      routeMappingSimulationMatrixGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Modelar mapeamento estático de rotas. Preservar legacy como rota obrigatória.'
    };
  }
}
