export class FiscalProductionTwoPersonRuleNoOpPlan {
  public static getPlan() {
    return {
      twoPersonRuleNoOpPlanGenerated: true,
      realExecutionGateUnlocked: false,
      description: 'Modelagem de regra de dupla validação como no-op. Não conclui aprovação real.'
    };
  }
}
