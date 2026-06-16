export class FiscalProductionSensitiveDataDriftNoDetectRealMatrix {
  public static getMatrix() {
    return {
      sensitiveDataDriftMatrixGenerated: true,
      realSensitiveDataDriftDetected: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Verificação documental de dados sensíveis (sem scan real).'
    };
  }
}
