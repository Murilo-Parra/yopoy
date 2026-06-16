export class FiscalProductionComplianceNoSubmissionHandoffService {
  public static simulateHandoff() {
    return {
      noSubmissionHandoffGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Simular handoff final sem submissão real. Não destravar gate. Não conceder autorização.'
    };
  }
}
