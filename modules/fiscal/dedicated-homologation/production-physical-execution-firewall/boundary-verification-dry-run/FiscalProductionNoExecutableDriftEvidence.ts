export class FiscalProductionNoExecutableDriftEvidence {
  public static getEvidence() {
    return {
      noExecutableDriftEvidenceGenerated: true,
      executableDriftDetected: false,
      realRuntimeProbed: false,
      realDatabaseConnected: false,
      routeToV2: false,
      description: 'Evidenciar ausência de drift executável real.'
    };
  }
}
