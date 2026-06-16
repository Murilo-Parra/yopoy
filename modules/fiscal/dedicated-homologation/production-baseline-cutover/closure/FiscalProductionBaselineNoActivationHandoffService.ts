export class FiscalProductionBaselineNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelagem de handoff final sem ativação. Não destrava gate e não concede autorização real.'
    };
  }
}
