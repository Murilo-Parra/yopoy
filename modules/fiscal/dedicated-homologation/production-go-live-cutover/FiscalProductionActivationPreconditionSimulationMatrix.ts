export class FiscalProductionActivationPreconditionSimulationMatrix {
  public static getMatrix() {
    return {
      activationPreconditionSimulationMatrixGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Modelar precondições de ativação em simulação. Não ativar Produção V2.'
    };
  }
}
