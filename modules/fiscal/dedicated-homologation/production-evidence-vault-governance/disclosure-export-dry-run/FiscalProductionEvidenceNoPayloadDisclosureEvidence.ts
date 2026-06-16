export class FiscalProductionEvidenceNoPayloadDisclosureEvidence {
  public static getEvidence() {
    return {
      noPayloadDisclosureEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realPayloadRead: false,
      description: 'Evidenciar ausência de divulgação de payload.'
    };
  }
}
