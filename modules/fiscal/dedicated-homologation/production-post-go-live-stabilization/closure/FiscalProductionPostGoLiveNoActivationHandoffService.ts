export class FiscalProductionPostGoLiveNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realHandoffConcluded: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Modelar handoff final sem ativação. Não concluir handoff operacional real. Não destravar gate real. Não conceder autorização real.'
    };
  }
}
