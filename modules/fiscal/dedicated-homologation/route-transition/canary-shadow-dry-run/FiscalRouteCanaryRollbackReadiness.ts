export class FiscalRouteCanaryRollbackReadiness {
  public static review() {
    return {
      canaryRollbackReadinessGenerated: true,
      trafficChanged: false,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Documentary modeling of canary rollback readiness. Does not execute real rollback.'
    };
  }
}
