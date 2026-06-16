export class FiscalProductionOperationsSignatureNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realOperationsHandoffCompleted: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Modelar handoff final de não ativação do domínio 32. Não concluir handoff operacional real. Não destravar gate. Não conceder autorização.'
    };
  }
}
