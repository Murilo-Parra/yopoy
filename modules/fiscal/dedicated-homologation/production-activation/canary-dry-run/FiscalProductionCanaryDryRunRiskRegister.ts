export class FiscalProductionCanaryDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-PCD-01: Risco de escopo canário simulado ser interpretado como inclusão real de tenant.',
      'R-PCD-02: Risco de traffic switch dry-run ser convertido em roteamento real sem novo gate.',
      'R-PCD-03: Risco de percentual canário ser confundido com rollout real.',
      'R-PCD-04: Risco de handler V2 ser chamado por engano em teste manual.',
      'R-PCD-05: Risco de kill-switch documental ser confundido com kill-switch instalado.',
      'R-PCD-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
