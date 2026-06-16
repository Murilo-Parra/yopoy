export class FiscalProductionLoadBalancerNoChangePlan {
  public static getPlan() {
    return {
      loadBalancerNoChangePlanGenerated: true,
      realLoadBalancerSwitched: false,
      description: 'Modelar load balancer sem alteração.'
    };
  }
}
