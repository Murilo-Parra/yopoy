export class FiscalProductionOperationsSignatureEvidenceNoPersistencePlan {
  public static getPlan() {
    return {
      signatureEvidenceNoPersistencePlanGenerated: true,
      realConsentPersisted: false,
      realSignatureRecordPersisted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelar evidência de assinatura sem persistência real. Não persistir consentimento, assinatura ou payload bruto.'
    };
  }
}
