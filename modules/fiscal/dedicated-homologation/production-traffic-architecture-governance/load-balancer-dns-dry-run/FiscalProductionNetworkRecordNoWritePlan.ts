export class FiscalProductionNetworkRecordNoWritePlan {
  public static getPlan() {
    return {
      networkRecordNoWritePlanGenerated: true,
      realNetworkRecordWritten: false,
      description: 'Plano documentando que não haverá gravação nos Network Records de produção.'
    };
  }
}
