export class FiscalProductionTrafficAbortReversionMatrix {
  public static getMatrix() {
    return {
      trafficAbortReversionMatrixGenerated: true,
      trafficChanged: false,
      realRollbackExecuted: false,
      description: 'Modelagem de abort e reversão sem execução. Não altera tráfego nem executa rollback.'
    };
  }
}
