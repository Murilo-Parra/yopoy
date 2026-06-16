export class FiscalProductionNoPhysicalExecutionEvidence {
  public static getEvidence() {
    return {
      noPhysicalExecutionEvidenceGenerated: true,
      realProductionActivationExecuted: false,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      routeToV2: false,
      trafficChanged: false,
      description: 'Evidenciar ausência de execução física.'
    };
  }
}
