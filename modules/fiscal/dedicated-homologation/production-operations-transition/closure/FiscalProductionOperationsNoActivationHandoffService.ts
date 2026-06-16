export class FiscalProductionOperationsNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      realGoLiveExecuted: false,
      description: 'Handoff final sem autorização real. Não concede go-live nem destrava gate.'
    };
  }
}
