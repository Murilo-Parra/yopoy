export class FiscalProductionActivationRiskRegister {
  public static getRisks() {
    return [
      'R-PAB-01: Risco de blueprint ser interpretado como autorização operacional.',
      'R-PAB-02: Risco de traffic switch plan ser implementado sem novo gate.',
      'R-PAB-03: Risco de canary documental ser confundido com canary ativo.',
      'R-PAB-04: Risco de rollback plan não ser testado em ambiente real controlado.',
      'R-PAB-05: Risco de Produção V2 ser ativada por flag externa.',
      'R-PAB-06: Risco de dependências legais ainda serem apenas documentais.'
    ];
  }
}
