export class FiscalProductionOperationsNoRealSignaturePersistenceEvidence {
  public static getEvidence() {
    return {
      noRealSignaturePersistenceEvidenceGenerated: true,
      realConsentPersisted: false,
      realSignatureRecordPersisted: false,
      realAttestationPersisted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Evidenciar ausência de persistência real de assinatura.'
    };
  }
}
