export class FiscalProductionActivationFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PAC-01: Risco de closure ser interpretado como autorização operacional.',
      'R-PAC-02: Risco de evidence package ser tratado como release approval.',
      'R-PAC-03: Risco de handoff ser convertido em ativação sem novo gate.',
      'R-PAC-04: Risco de dual-run documental ser confundido com dual-run ativo.',
      'R-PAC-05: Risco de rollback/kill-switch documental ser confundido com runtime instalado.',
      'R-PAC-06: Risco de Produção V2 ser ativada por flag externa.',
      'R-PAC-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
