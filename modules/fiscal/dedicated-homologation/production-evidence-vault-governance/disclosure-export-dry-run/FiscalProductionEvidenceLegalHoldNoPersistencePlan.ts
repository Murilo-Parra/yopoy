export class FiscalProductionEvidenceLegalHoldNoPersistencePlan {
  public static getPlan() {
    return {
      legalHoldNoPersistencePlanGenerated: true,
      realLegalHoldPersisted: false,
      realAuditRecordPersisted: false,
      description: 'Modelar legal hold sem persistência real. Não persistir legal hold.'
    };
  }
}
