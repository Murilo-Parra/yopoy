export class FiscalProductionTrafficRoutingRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PTR-01: Risco de traffic routing blueprint ser interpretado como alteração real.',
      'R-PTR-02: Risco de load balancer no-op ser confundido com switch real.',
      'R-PTR-03: Risco de DNS no-change ser lido como mudança planejada de DNS.',
      'R-PTR-04: Risco de shadow traffic no-capture ser confundido com shadow real.',
      'R-PTR-05: Risco de traffic slices simuladas parecerem canary real.',
      'R-PTR-06: Risco de UI ocultar routeToV2=false.',
      'R-PTR-07: Risco de automação externa ignorar simulationOnly e activationBlocked.',
      'R-PTR-08: Risco de testes temporários permanecerem no repositório.',
      'R-PTR-09: Risco de namespace/export colidir com domínios anteriores.',
      'R-PTR-10: Risco de logs administrativos serem confundidos com evento produtivo de tráfego.'
    ];
  }
}
