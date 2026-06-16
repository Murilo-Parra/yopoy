export class FiscalProductionCanaryRampDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: ['28', '29', '30', '31', '32', '33.1', '33.2', '33.3'],
      description: 'Consolidar dependências dos domínios 28, 29, 30, 31, 32, 33.1, 33.2 e 33.3. Nenhuma dependência concede canary real, tráfego real, routeToV2, ativação real ou Produção V2.'
    };
  }
}
