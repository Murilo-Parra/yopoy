export class FiscalProductionRemediationReadinessNoExecutePlan {
  public static getPlan() {
    return {
      remediationReadinessNoExecutePlanGenerated: true,
      realRemediationExecuted: false,
      realMitigationExecuted: false,
      description: 'Modelar readiness de remediação sem execução. Não executar remediação real. Não executar mitigação real.'
    };
  }
}
