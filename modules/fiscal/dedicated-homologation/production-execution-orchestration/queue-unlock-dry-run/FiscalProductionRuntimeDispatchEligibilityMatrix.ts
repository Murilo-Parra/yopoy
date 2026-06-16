export class FiscalProductionRuntimeDispatchEligibilityMatrix {
  public static getMatrix() {
    return {
      dispatchEligibilityMatrixGenerated: true,
      approvedForRealWorkerDispatch: false,
      description: 'Modelagem da elegibilidade de dispatch em modo documental. Não autoriza dispatch real.'
    };
  }
}
