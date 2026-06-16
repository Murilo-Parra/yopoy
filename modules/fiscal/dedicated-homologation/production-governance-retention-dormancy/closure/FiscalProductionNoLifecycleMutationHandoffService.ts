export class FiscalProductionNoLifecycleMutationHandoffService {
  public static simulateHandoff() {
    return {
      noLifecycleMutationHandoffGenerated: true,
      realExpirationEvaluated: false,
      realDeletionExecuted: false,
      realLifecycleMutated: false,
      description: 'Simular handoff de ausência de expiração/deleção/lifecycle mutation.'
    };
  }
}
