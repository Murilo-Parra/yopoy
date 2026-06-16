export class FiscalProductionFinalStateLineageNoExternalVerifyPlan {
  public static getPlan() {
    return {
      finalStateLineageNoExternalVerifyPlanGenerated: true,
      realExternalApiCalled: false,
      realSefazCalled: false,
      description: 'Simular lineage do estado final sem verificação externa.'
    };
  }
}
