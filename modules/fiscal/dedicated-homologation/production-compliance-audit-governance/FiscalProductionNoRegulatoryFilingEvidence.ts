export class FiscalProductionNoRegulatoryFilingEvidence {
  public static getEvidence() {
    return {
      noRegulatoryFilingEvidenceGenerated: true,
      realRegulatoryFilingSubmitted: false,
      realRegulatoryFilingPersisted: false,
      description: 'Evidenciar ausência de regulatory filing real.'
    };
  }
}
