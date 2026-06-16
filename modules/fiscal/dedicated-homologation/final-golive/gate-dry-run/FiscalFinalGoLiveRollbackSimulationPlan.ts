export class FiscalFinalGoLiveRollbackSimulationPlan {
  public static simulateRollback() {
    return {
      rollbackSimulationGenerated: true,
      rollbackSimulated: true,
      description: 'Documentary rollback simulation plan. Does not execute real rollback, alter traffic, or alter routes.'
    };
  }
}
