export class FiscalProductionComplianceRollbackShutdownDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: [
        'FiscalProductionComplianceActionSimulationMatrix',
        'FiscalProductionComplianceNoRealGateUnlockEvidence',
        'FiscalProductionReleaseFilingNoOpBlueprint'
      ],
      description: 'Mapear dependências do Módulo 36.4, garantindo continuidade do simulation-only.'
    };
  }
}
