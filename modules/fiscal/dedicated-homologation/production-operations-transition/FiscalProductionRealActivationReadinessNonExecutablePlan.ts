export class FiscalProductionRealActivationReadinessNonExecutablePlan {
  public static getPlan() {
    return {
      realActivationReadinessNonExecutablePlanGenerated: true,
      productionV2Activated: false,
      realDeployExecuted: false,
      cutoverExecuted: false,
      description: 'Modelagem de readiness de ativação real como plano não executável. Não ativa produção.'
    };
  }
}
