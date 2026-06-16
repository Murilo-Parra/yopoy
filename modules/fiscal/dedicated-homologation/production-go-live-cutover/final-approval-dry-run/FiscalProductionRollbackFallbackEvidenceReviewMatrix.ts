export class FiscalProductionRollbackFallbackEvidenceReviewMatrix {
  public static getMatrix() {
    return {
      rollbackFallbackEvidenceReviewMatrixGenerated: true,
      realRollbackExecuted: false,
      realFallbackExecuted: false,
      description: 'Revisar rollback/fallback apenas documentalmente. Não executar rollback/fallback real.'
    };
  }
}
