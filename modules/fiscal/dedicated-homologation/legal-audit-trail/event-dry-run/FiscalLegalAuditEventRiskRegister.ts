export class FiscalLegalAuditEventRiskRegister {
  public static getRisks() {
    return [
      'R-LAE-01: Risco de event dry-run ser interpretado como evento legal real.',
      'R-LAE-02: Risco de append simulation ser convertida em INSERT real.',
      'R-LAE-03: Risco de correction event ser implementado como UPDATE real.',
      'R-LAE-04: Risco de retention event ser convertido em DELETE real.',
      'R-LAE-05: Risco de linkage plan ser usado como FK real sem novo gate.',
      'R-LAE-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
