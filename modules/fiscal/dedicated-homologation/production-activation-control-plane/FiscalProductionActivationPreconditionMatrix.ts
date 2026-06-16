export class FiscalProductionActivationPreconditionMatrix {
  public static getMatrix() {
    return {
      activationPreconditionMatrixGenerated: true,
      approvedForRealProductionActivation: false,
      approvedForProductionV2: false,
      approvedForRouteToV2: false,
      description: 'Modelar matriz de pré-condições para eventual ativação futura. Não aprovar ativação real. Não aprovar Produção V2.'
    };
  }
}
