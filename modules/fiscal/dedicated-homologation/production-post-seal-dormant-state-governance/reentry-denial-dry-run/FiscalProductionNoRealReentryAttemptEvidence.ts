export class FiscalProductionNoRealReentryAttemptEvidence {
  public static getEvidence() {
    return {
      noRealReentryAttemptEvidenceGenerated: true,
      realReentryAttemptCreated: false,
      description: 'Evidenciar ausência de tentativa real de reentrada.'
    };
  }
}
