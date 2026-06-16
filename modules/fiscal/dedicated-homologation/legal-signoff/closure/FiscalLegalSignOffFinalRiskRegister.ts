export class FiscalLegalSignOffFinalRiskRegister {
  public static getRisks() {
    return [
      'R-LSC-01: Risco de closure ser interpretado como assinatura legal real.',
      'R-LSC-02: Risco de evidence package ser tratado como prova jurídica definitiva.',
      'R-LSC-03: Risco de final signature readiness ser confundido com assinatura concedida.',
      'R-LSC-04: Risco de committee dry-run ser confundido com comitê jurídico definitivo.',
      'R-LSC-05: Risco de mock signature ser confundida com assinatura criptográfica real.',
      'R-LSC-06: Risco de Produção V2 ser ativada por flag externa.',
      'R-LSC-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
