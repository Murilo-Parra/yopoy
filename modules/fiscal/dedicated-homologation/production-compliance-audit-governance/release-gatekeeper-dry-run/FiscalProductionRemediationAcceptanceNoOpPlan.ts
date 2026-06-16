export class FiscalProductionRemediationAcceptanceNoOpPlan {
  public static getPlan() {
    return {
      remediationAcceptanceNoOpPlanGenerated: true,
      realRemediationExecuted: false,
      description: 'Modelar acceptance de remediação sem execução. Não executar remediation real.'
    };
  }
}
