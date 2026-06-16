export class FiscalProductionPhysicalExecutionNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realHandoffConcluded: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Produzir handoff final sem ativação. Não concluir handoff operacional real. Não destravar gate real.'
    };
  }
}
