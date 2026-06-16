export class FiscalProductionOperationsSignatureRecordNoPersistencePlan {
  public static getPlan() {
    return {
      signatureRecordNoPersistencePlanGenerated: true,
      realConsentPersisted: false,
      realSignatureRecordPersisted: false,
      realApprovalRecordPersisted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Modelar registro de assinatura sem persistência real. Não persistir assinatura, consentimento ou approval record.'
    };
  }
}
