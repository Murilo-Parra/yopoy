export class FiscalProductionNoRealObservationEvidence {
  public static getEvidence() {
    return {
      noRealObservationEvidenceGenerated: true,
      realProductionObserved: false,
      realMetricsCaptured: false,
      description: 'Evidenciar ausência de observação real.'
    };
  }
}
