export class FiscalProductionAuthorizationRequestIntake {
  public static generateIntake() {
    return {
      requestIntakeGenerated: true,
      authorizationRequestIntakeOnly: true,
      realAuthorizationRequestPersisted: false,
      realAuthorizationGranted: false,
      description: 'Model of administrative intake for the request. No real request is persisted or authorized.'
    };
  }
}
