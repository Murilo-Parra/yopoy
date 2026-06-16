export class FiscalProductionCanaryPercentageNoOpMatrix {
  public static getMatrix() {
    return {
      canaryPercentageNoOpMatrixGenerated: true,
      realCanaryActivated: false,
      approvedForRealCanaryActivation: false,
      description: 'Modelar percentuais de canary sem execução. Não ativar canary real.'
    };
  }
}
