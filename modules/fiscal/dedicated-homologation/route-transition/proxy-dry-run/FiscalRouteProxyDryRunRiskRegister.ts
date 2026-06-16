export class FiscalRouteProxyDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-RPD-01: Risco de proxy dry-run ser interpretado como proxy instalado.',
      'R-RPD-02: Risco de middleware simulation ser confundida com middleware ativo.',
      'R-RPD-03: Risco de tap simulation ser confundida com captura real.',
      'R-RPD-04: Risco de conditional routing simulation ser tratado como routeToV2.',
      'R-RPD-05: Risco de fallback simulation ser entendido como fallback operacional.',
      'R-RPD-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
