export class FiscalLegalAuditFinalRiskRegister {
  public static getRisks() {
    return [
      'R-LAC-01: Risco de closure ser interpretado como autorização operacional.',
      'R-LAC-02: Risco de evidence package ser interpretado como trilha legal definitiva.',
      'R-LAC-03: Risco de hash mock ser tratado como hash legal definitivo.',
      'R-LAC-04: Risco de handoff ser usado para persistência real sem novo módulo.',
      'R-LAC-05: Risco de política de retenção ser aplicada como DELETE real.',
      'R-LAC-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
