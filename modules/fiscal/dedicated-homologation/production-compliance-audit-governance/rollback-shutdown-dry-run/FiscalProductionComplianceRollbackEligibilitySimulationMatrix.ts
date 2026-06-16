export class FiscalProductionComplianceRollbackEligibilitySimulationMatrix {
  public static getMatrix() {
    return {
      rollbackEligibilitySimulationMatrixGenerated: true,
      realRollbackExecuted: false,
      realAuthorizationGranted: false,
      description: 'Modelar elegibilidade de rollback por metadados. Não aprovar rollback real.'
    };
  }
}
