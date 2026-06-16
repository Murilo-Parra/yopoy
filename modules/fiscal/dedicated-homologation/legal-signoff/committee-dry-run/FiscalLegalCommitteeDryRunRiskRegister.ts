export class FiscalLegalCommitteeDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-LCD-01: Risco de committee dry-run ser interpretado como aprovação real de comitê.',
      'R-LCD-02: Risco de quórum simulado ser tratado como quórum jurídico definitivo.',
      'R-LCD-03: Risco de risk acceptance review ser usado como aceite real de risco.',
      'R-LCD-04: Risco de waiver documental ser confundido com exceção operacional.',
      'R-LCD-05: Risco de evidence review ser tratado como autorização de assinatura.',
      'R-LCD-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
