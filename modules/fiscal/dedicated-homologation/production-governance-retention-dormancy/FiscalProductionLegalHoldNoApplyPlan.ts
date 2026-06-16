export class FiscalProductionLegalHoldNoApplyPlan {
  public static getPlan() {
    return {
      legalHoldNoApplyPlanGenerated: true,
      realLegalHoldApplied: false,
      noLegalEffectOnly: true,
      description: 'Simular legal hold sem aplicar bloqueio real.'
    };
  }
}
