export class FiscalProductionActivationConsentRequestIntake {
  public static getIntake() {
    return {
      requestIntakeGenerated: true,
      realAuthorizationGranted: false,
      realConsentPersisted: false,
      description: 'Modelagem de intake administrativo de solicitação de consentimento. Não persiste solicitação real. Não concede autorização real.'
    };
  }
}
