export class FiscalProductionRuntimeNoExecutionHandoffService {
  public static getHandoff() {
    return {
      noExecutionHandoffGenerated: true,
      realHandoffConcluded: false,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelar handoff final sem concluir handoff operacional real. Não conceder autorização.'
    };
  }
}
