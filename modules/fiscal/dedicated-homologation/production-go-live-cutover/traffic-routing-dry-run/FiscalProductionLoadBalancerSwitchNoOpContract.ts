export class FiscalProductionLoadBalancerSwitchNoOpContract {
  public static getContract() {
    return {
      loadBalancerSwitchNoOpContractGenerated: true,
      realLoadBalancerSwitched: false,
      realDnsChanged: false,
      description: 'Modelar contrato de load balancer switch no-op. Não alterar balanceador real. Não alterar DNS real.'
    };
  }
}
