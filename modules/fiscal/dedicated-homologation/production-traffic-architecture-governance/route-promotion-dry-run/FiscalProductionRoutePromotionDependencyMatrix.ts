export class FiscalProductionRoutePromotionDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: [
        'FiscalProductionTrafficArchitecture',
        'FiscalProductionLoadBalancerDns',
        'FiscalProductionProxyShadow'
      ],
      description: 'Consolidar dependências dos domínios 28 a 39.3. Declarar que nenhum domínio anterior ativou Produção V2, routeToV2, alteração real de tráfego, load balancer real, DNS real, proxy real, middleware real, tap real, mirror real, sniffer real, shadow traffic real, capture real, canary real, banco real, SEFAZ real ou handler V2 operacional real.'
    };
  }
}
