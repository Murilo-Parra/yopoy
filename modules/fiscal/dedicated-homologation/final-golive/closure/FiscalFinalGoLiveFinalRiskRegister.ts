export class FiscalFinalGoLiveFinalRiskRegister {
  public static getRisks() {
    return [
      'R-FGC-01: Risco de closure ser interpretado como ativação real.',
      'R-FGC-02: Risco de evidence package ser tratado como autorização de produção.',
      'R-FGC-03: Risco de final readiness review ser confundido com go-live aprovado.',
      'R-FGC-04: Risco de gate dry-run ser interpretado como unlock real.',
      'R-FGC-05: Risco de mock activation runbook ser tratado como runbook executável.',
      'R-FGC-06: Risco de Produção V2 ser ativada por flag externa.',
      'R-FGC-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
