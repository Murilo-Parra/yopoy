export class FiscalProductionDomainNoActivationContinuityMatrix {
  public static getMatrix() {
    return {
      domainNoActivationContinuityMatrixGenerated: true,
      realGoLiveExecuted: false,
      realCutoverExecuted: false,
      productionV2Activated: false,
      description: 'Consolidar ausência de go-live, cutover e Produção V2.'
    };
  }
}
