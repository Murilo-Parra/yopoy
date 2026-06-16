export class FiscalProductionExpirationSuppressionNoExecutePlan {
  public static getPlan() {
    return {
      expirationSuppressionNoExecutePlanGenerated: true,
      realDataExpired: false,
      description: 'Bloquear expiração real.'
    };
  }
}
