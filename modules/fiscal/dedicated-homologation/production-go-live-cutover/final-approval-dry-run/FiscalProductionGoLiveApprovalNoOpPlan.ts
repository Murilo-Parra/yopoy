export class FiscalProductionGoLiveApprovalNoOpPlan {
  public static getPlan() {
    return {
      goLiveApprovalNoOpPlanGenerated: true,
      realGoLiveApproved: false,
      realGoLiveExecuted: false,
      description: 'Modelar aprovação de go-live como no-op. Não executar go-live.'
    };
  }
}
