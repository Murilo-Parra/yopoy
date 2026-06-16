export class FiscalProductionExpirationWindowNoEvaluatePlan {
  public static getPlan() {
    return {
      expirationWindowNoEvaluatePlanGenerated: true,
      realExpirationEvaluated: false,
      realDataExpired: false,
      description: 'Simular janela de expiração sem avaliação real de TTL.'
    };
  }
}
