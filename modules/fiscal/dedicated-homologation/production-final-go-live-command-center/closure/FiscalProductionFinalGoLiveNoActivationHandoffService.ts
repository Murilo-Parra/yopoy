export class FiscalProductionFinalGoLiveNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      productionV2Activated: false,
      description: 'Simular handoff final sem ativação. Não destravar gate, não emitir token, não ativar Produção V2.'
    };
  }
}
