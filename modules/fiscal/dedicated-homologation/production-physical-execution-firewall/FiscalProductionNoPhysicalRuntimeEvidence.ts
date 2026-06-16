export class FiscalProductionNoPhysicalRuntimeEvidence {
  public static getEvidence() {
    return {
      noPhysicalRuntimeEvidenceGenerated: true,
      physicalRuntimeExecuted: false,
      runtimeExecutionStarted: false,
      realDatabaseConnected: false,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Evidenciar ausência de execução física.'
    };
  }
}
