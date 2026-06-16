export class FiscalProductionPreflightCutoverReadiness {
  public static generateReadiness() {
    return {
      cutoverReadinessGenerated: true,
      realCutoverApproved: false,
      cutoverExecuted: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Modeled readiness for cutover without actually approving or executing a cutover.'
    };
  }
}
