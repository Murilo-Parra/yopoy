export class FiscalProductionBatchMicroBatchNoExecutePlan {
  public static getPlan() {
    return {
      batchMicroBatchNoExecutePlanGenerated: true,
      realBatchExecuted: false,
      realMicroBatchExecuted: false,
      description: 'Modelar batch e micro-batch sem execução real.'
    };
  }
}
