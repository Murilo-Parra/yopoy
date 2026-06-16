export class FiscalProductionExplicitActivationConsentBoundary {
  public static getBoundary() {
    return {
      activationConsentBoundaryGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelagem de limite explícito de consentimento para ativação real futura. Não concede consentimento real.'
    };
  }
}
