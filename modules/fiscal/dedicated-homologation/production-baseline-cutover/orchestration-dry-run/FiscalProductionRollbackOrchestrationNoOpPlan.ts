export class FiscalProductionRollbackOrchestrationNoOpPlan {
  public static getPlan() {
    return {
      rollbackOrchestrationNoOpPlanGenerated: true,
      realRollbackExecuted: false,
      trafficChanged: false,
      description: 'Modelagem rollback orchestration como no-op. Não executa rollback real.'
    };
  }
}
