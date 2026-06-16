export class FiscalProductionPostRollbackComplianceReviewNoPersistencePlan {
  public static getPlan() {
    return {
      postRollbackComplianceReviewNoPersistencePlanGenerated: true,
      realAuditRecordPersisted: false,
      realTicketCreated: false,
      description: 'Modelar revisão pós-rollback sem persistência. Não persistir audit record real. Não criar finding real.'
    };
  }
}
