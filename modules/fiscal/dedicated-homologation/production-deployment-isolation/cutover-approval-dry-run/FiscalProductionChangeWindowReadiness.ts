export class FiscalProductionChangeWindowReadiness {
  public static generateReadiness() {
    return {
      changeWindowReadinessGenerated: true,
      realCutoverApproved: false,
      cutoverExecuted: false,
      productionV2Activated: false,
      description: 'Modeled future change window. No real window is opened or executed.'
    };
  }
}
