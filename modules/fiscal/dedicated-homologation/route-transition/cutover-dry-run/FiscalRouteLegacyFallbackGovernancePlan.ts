export class FiscalRouteLegacyFallbackGovernancePlan {
  public static generateGovernance() {
    return {
      legacyFallbackGovernanceGenerated: true,
      realFallbackExecuted: false,
      routeToLegacy: true,
      routeToV2: false,
      trafficChanged: false,
      description: 'Legacy fallback administrative modeling. Does not execute real fallback.'
    };
  }
}
