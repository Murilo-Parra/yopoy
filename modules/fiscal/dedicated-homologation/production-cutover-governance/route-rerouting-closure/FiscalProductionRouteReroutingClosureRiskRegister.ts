export class FiscalProductionRouteReroutingClosureRiskRegister {
  public static getRisks() {
    return [
      'R-PRRC-01: Risco de route rerouting closure ser interpretado como re-routing executado.',
      'R-PRRC-02: Risco de legacy fallback no-op ser confundido com fallback operacional ativo.',
      'R-PRRC-03: Risco de route invariant evidence ser tratado como tráfego real validado.',
      'R-PRRC-04: Risco de no-traffic-change evidence ser usado por automação externa como permissão de tráfego.',
      'R-PRRC-05: Risco de static route comparison ser confundido com chamada real a endpoints.',
      'R-PRRC-06: Risco de route reversion matrix ser entendida como rollback instalado.',
      'R-PRRC-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRRC-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
