export class FiscalProductionPostGoLiveRemediationNoPersistencePlan {
  public static getPlan() {
    return {
      postGoLiveRemediationNoPersistencePlanGenerated: true,
      dmlExecuted: false,
      fileSystemWritten: false,
      externalStorageUploaded: false,
      description: 'Modelar pós-remediação sem persistência. Não gravar banco, filesystem ou storage externo.'
    };
  }
}
