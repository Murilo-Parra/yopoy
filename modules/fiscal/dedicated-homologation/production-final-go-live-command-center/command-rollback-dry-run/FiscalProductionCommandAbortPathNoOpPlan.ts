export class FiscalProductionCommandAbortPathNoOpPlan {
  public static getPlan() {
    return {
      commandAbortPathNoOpPlanGenerated: true,
      realAbortExecuted: false,
      description: 'Modelar caminho documental de abort. Não executar abort real.'
    };
  }
}
