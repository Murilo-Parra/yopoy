export class FiscalOperationalHandoffFinalRiskRegister {
  public static getRisks() {
    return [
      'R-OHC-01: Risco de closure ser interpretado como assinatura legal real.',
      'R-OHC-02: Risco de evidence package ser tratado como aprovação operacional.',
      'R-OHC-03: Risco de legal sign-off readiness ser confundido com assinatura concedida.',
      'R-OHC-04: Risco de handoff final ser convertido em execução sem novo gate.',
      'R-OHC-05: Risco de comitê dry-run ser confundido com comitê legal definitivo.',
      'R-OHC-06: Risco de Produção V2 ser ativada por flag externa.',
      'R-OHC-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
