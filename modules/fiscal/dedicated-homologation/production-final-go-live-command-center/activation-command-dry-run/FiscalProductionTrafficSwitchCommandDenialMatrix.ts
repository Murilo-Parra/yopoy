export class FiscalProductionTrafficSwitchCommandDenialMatrix {
  public static getMatrix() {
    return {
      trafficSwitchCommandDenialMatrixGenerated: true,
      realTrafficChanged: false,
      realLoadBalancerSwitched: false,
      realDnsChanged: false,
      description: 'Negar mudança de tráfego, load balancer, DNS, proxy, middleware, tap, mirror, sniffer e shadow traffic.'
    };
  }
}
