export class FiscalProductionActivationGoNoGoNoOpMatrix {
  public static getMatrix() {
    return {
      goNoGoNoOpMatrixGenerated: true,
      go: false,
      noGo: true,
      realProductionActivationExecuted: false,
      approvedForProductionV2: false,
      description: 'Modelar GO/NO-GO sem execução. Manter go: false e noGo: true para qualquer ativação real.'
    };
  }
}
