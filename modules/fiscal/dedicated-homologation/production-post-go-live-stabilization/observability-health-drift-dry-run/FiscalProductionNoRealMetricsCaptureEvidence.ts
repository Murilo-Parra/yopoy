export class FiscalProductionNoRealMetricsCaptureEvidence {
  public static getEvidence() {
    return {
      noRealMetricsCaptureEvidenceGenerated: true,
      realMetricsCaptured: false,
      realLogsCaptured: false,
      realTracesCaptured: false,
      description: 'Evidenciar ausência de captura de métrica real.'
    };
  }
}
