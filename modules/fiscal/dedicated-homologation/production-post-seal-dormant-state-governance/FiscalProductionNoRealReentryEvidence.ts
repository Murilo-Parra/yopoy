export class FiscalProductionNoRealReentryEvidence {
  public static getEvidence() {
    return {
      noRealReentryEvidenceGenerated: true,
      realReentryPathCreated: false,
      realActivationPathCreated: false,
      realProductionV2PathCreated: false,
      description: 'Evidenciar ausência de reentrada operacional real.'
    };
  }
}
