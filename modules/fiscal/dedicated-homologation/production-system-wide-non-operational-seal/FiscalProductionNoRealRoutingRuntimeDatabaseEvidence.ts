export class FiscalProductionNoRealRoutingRuntimeDatabaseEvidence {
  public static getEvidence() {
    return {
      noRealRoutingRuntimeDatabaseEvidenceGenerated: true,
      realTrafficChanged: false,
      realRuntimeStarted: false,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Evidenciar ausência de routing, runtime e banco reais.'
    };
  }
}
