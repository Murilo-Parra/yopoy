export class FiscalProductionLoadBalancerDnsPolicy {
  public static getPolicy() {
    return {
      name: 'PRODUCTION_LOAD_BALANCER_DNS_READ_ONLY_POLICY',
      message: 'Este módulo é apenas para mapeamento read-only de load balancer e DNS. Nenhuma alteração real de rede ou roteamento de tráfego é permitida.',
      enforcementLevel: 'STRICT',
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true
    };
  }
}
