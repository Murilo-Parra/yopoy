export class FiscalProductionRegulatoryRollbackEvidenceSimulationMatrix {
  public static getMatrix() {
    return {
      regulatoryRollbackEvidenceSimulationMatrixGenerated: true,
      realRollbackRecordPersisted: false,
      externalStorageUploaded: false,
      description: 'Modelar evidências regulatórias de rollback sem persistência. Não persistir rollback record real. Não exportar evidência real.'
    };
  }
}
