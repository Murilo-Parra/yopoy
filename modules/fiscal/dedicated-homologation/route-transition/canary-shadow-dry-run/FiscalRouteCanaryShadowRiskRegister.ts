export class FiscalRouteCanaryShadowRiskRegister {
  public static getRisks() {
    return [
      'R-RCS-01: Risco de canary shadow dry-run ser interpretado como canary real.',
      'R-RCS-02: Risco de traffic mirror approval gate ser confundido com mirror ativo.',
      'R-RCS-03: Risco de shadow traffic simulation ser confundida com tráfego duplicado real.',
      'R-RCS-04: Risco de no-capture evidence ser tratado como evidência de captura validada.',
      'R-RCS-05: Risco de payload simulation induzir expectativa de payload real.',
      'R-RCS-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
