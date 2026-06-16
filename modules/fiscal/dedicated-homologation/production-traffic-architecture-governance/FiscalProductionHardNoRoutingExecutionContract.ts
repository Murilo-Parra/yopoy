export class FiscalProductionHardNoRoutingExecutionContract {
  public static getContract() {
    return {
      hardNoRoutingExecutionContractGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Definir contrato rígido de não execução de roteamento. Bloquear routeToV2, load balancer, DNS, proxy, middleware, tap, mirror, sniffer e shadow traffic reais.'
    };
  }
}
