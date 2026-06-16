export class FiscalProductionNoRealExternalIntegrationEvidence {
  public static getEvidence() {
    return {
      noRealExternalIntegrationEvidenceGenerated: true,
      realSefazCalled: false,
      realExternalApiCalled: false,
      realWebhookSent: false,
      description: 'Evidenciar ausência de SEFAZ, API externa e webhook.'
    };
  }
}
