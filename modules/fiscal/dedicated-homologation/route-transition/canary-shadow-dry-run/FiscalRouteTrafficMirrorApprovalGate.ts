export class FiscalRouteTrafficMirrorApprovalGate {
  public static generateGate() {
    return {
      trafficMirrorApprovalGateGenerated: true,
      trafficMirrorSimulated: true,
      go: false,
      noGo: true,
      approvedForRealTrafficMirror: false,
      realTrafficMirrored: false,
      routeToV2: false,
      description: 'Mirror approval gate modeling. Always returns noGo for real mirroring.'
    };
  }
}
