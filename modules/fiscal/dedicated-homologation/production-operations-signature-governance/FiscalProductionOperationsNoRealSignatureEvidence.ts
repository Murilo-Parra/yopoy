export class FiscalProductionOperationsNoRealSignatureEvidence {
  public static getEvidence() {
    return {
      noRealSignatureEvidenceGenerated: true,
      realSignatureGranted: false,
      realCryptographicSignatureCollected: false,
      xmlSigned: false,
      pdfGenerated: false,
      description: 'Evidenciar ausência de assinatura real.'
    };
  }
}
