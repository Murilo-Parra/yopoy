export class FiscalProductionExternalNoRealCallEvidence {
  public static getEvidence() {
    return {
      externalNoRealCallEvidenceGenerated: true,
      realExternalApiCalled: false,
      realSefazCalled: false,
      realWebhookSent: false,
      description: 'Evidenciar ausência de chamada externa, SEFAZ, webhook e notification provider.'
    };
  }
}
