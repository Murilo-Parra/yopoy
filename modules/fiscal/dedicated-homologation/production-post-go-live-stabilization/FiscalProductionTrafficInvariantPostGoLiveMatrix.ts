export class FiscalProductionTrafficInvariantPostGoLiveMatrix {
  public static getMatrix() {
    return {
      trafficInvariantPostGoLiveMatrixGenerated: true,
      trafficChanged: false,
      realLoadBalancerSwitched: false,
      realDnsChanged: false,
      description: 'Documentar invariância de tráfego. Não alterar DNS, load balancer, proxy ou rota.'
    };
  }
}
