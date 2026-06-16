export class FiscalProductionTrafficSwitchRiskRegister {
  public static getRisks() {
    return [
      'R-PTS-01: Risco de traffic switch dry-run ser interpretado como mudança real de tráfego.',
      'R-PTS-02: Risco de route activation gate no-op ser confundido com destravamento real de rota.',
      'R-PTS-03: Risco de legacy continuity plan ocultar que V2 ainda está bloqueada.',
      'R-PTS-04: Risco de percentage ramp simulation ser tratada como canary real.',
      'R-PTS-05: Risco de reversible go-live no-op ser entendido como go-live executado.',
      'R-PTS-06: Risco de no-traffic mutation evidence ser usado por automação externa como permissão real.',
      'R-PTS-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PTS-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
