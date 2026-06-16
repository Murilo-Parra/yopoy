export class FiscalProductionDatabaseDriftNoDetectRealMatrix {
  public static getMatrix() {
    return {
      databaseDriftMatrixGenerated: true,
      realDatabaseDriftDetected: false,
      description: 'Verificação documental de banco (sem scan real).'
    };
  }
}
