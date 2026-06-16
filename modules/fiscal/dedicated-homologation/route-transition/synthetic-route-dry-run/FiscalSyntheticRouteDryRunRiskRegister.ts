export class FiscalSyntheticRouteDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-SRD-01: Risco de synthetic route dry-run ser interpretado como execução real.',
      'R-SRD-02: Risco de response shape comparator ser confundido com comparação de payload real.',
      'R-SRD-03: Risco de safe-shape ser tratado como contrato produtivo definitivo.',
      'R-SRD-04: Risco de diff sintético ser usado como autorização de routeToV2.',
      'R-SRD-05: Risco de no-handler-call evidence ser confundido com tracing real.',
      'R-SRD-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
