export class FiscalProductionTrafficReversionDenialMatrix {
  public static getMatrix() {
    return {
      trafficReversionDenialMatrixGenerated: true,
      realTrafficReverted: false,
      realTrafficChanged: false,
      realLoadBalancerSwitched: false,
      realDnsChanged: false,
      description: 'Negar reversão real de tráfego, load balancer e DNS.'
    };
  }
}
