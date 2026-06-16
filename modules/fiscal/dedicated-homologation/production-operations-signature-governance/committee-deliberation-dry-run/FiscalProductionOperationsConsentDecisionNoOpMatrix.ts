export class FiscalProductionOperationsConsentDecisionNoOpMatrix {
  public static getMatrix() {
    return {
      consentDecisionNoOpMatrixGenerated: true,
      go: false,
      noGo: true,
      realExecutionGateUnlocked: false,
      approvedForRealAuthorization: false,
      description: 'Modelar decisão GO/NO-GO sem execução. Manter go: false e noGo: true para qualquer ação real.'
    };
  }
}
