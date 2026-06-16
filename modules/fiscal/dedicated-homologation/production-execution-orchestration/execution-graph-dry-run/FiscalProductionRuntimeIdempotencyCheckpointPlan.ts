export class FiscalProductionRuntimeIdempotencyCheckpointPlan {
  public static generatePlan() {
    return {
      idempotencyCheckpointPlanGenerated: true,
      realJobEnqueued: false,
      realDatabaseConnected: false,
      description: 'Modelagem de checkpoints de idempotência sem persistência real. Não grava estado em banco real. Não enfileira job real.'
    };
  }
}
