export class FiscalProductionAuthorizationDeliberationRiskRegister {
  public static getRisks() {
    return [
      'R-PAD-01: Risco de deliberação dry-run ser interpretada como autorização real.',
      'R-PAD-02: Risco de quorum simulation ser confundida com quórum real.',
      'R-PAD-03: Risco de authority vote simulation ser tratada como voto persistido real.',
      'R-PAD-04: Risco de gate precondition review ser usado por automação externa para destravar gate real.',
      'R-PAD-05: Risco de consent evidence review converter indevidamente o consentimento dry-run em autorização real.',
      'R-PAD-06: Risco de risk acceptance no-op ser confundido com aceite real de risco.',
      'R-PAD-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PAD-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
