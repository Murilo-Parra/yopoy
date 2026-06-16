export class FiscalProductionCutoverAbortNoOpPlan {
  public static getPlan() {
    return {
      cutoverAbortNoOpPlanGenerated: true,
      realAbortExecuted: false,
      realKillSwitchActivated: false,
      description: 'Modelar abort de cutover como no-op. Não executar abort real. Não acionar kill-switch real.'
    };
  }
}
