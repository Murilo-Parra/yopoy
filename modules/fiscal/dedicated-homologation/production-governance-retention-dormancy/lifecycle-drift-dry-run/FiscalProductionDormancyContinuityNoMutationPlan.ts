export class FiscalProductionDormancyContinuityNoMutationPlan {
  public static getPlan() {
    return {
      dormancyContinuityNoMutationPlanGenerated: true,
      realRuntimeStarted: false,
      activationBlocked: true,
      description: 'Preservar dormência em simulação. Não iniciar runtime.'
    };
  }
}
