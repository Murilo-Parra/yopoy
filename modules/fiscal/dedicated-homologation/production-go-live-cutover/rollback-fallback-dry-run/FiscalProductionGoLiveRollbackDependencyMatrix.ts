export class FiscalProductionGoLiveRollbackDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: [
        'FiscalProductionTrafficRoutingNoOpBlueprint',
        'FiscalProductionLoadBalancerSwitchNoOpContract',
        'FiscalProductionNoTrafficMutationEvidence',
        'FiscalProductionNoLoadBalancerSwitchEvidence'
      ],
      description: 'Consolidar dependências dos domínios 28 a 37.2. Declarar que nenhum domínio anterior concedeu rollback real, abort real, fallback real, Produção V2, routeToV2, traffic change real, SEFAZ real, banco real, DNS real, load balancer real ou handler V2 operacional real.'
    };
  }
}
