export class FiscalOperationalCommitteeDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-OCD-01: Risco de aprovação dry-run ser interpretada como aprovação real.',
      'R-OCD-02: Risco de quórum simulado ser tratado como quórum legal definitivo.',
      'R-OCD-03: Risco de risk acceptance simulation ser usada como aceitação real de risco.',
      'R-OCD-04: Risco de waiver documental ser confundido com exceção operacional.',
      'R-OCD-05: Risco de evidence review ser tratado como autorização de produção.',
      'R-OCD-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
