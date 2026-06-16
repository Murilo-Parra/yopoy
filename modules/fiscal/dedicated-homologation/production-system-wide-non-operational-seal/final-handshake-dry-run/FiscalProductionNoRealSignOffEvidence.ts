export class FiscalProductionNoRealSignOffEvidence {
  public static getEvidence() {
    return {
      noRealSignOffEvidenceGenerated: true,
      realSignOffConcluded: false,
      realSignatureCollected: false,
      description: 'Evidenciar ausência de sign-off real e assinatura real.'
    };
  }
}
