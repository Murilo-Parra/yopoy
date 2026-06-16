export class FiscalProductionActivationNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      productionV2Activated: false,
      description: 'Modelar handoff final sem autorização real. Não destravar gate real. Não emitir token real. Não ativar Produção V2.'
    };
  }
}
