export class FiscalFinalGoLiveGateDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-FGD-01: Risco de gate dry-run ser interpretado como unlock real.',
      'R-FGD-02: Risco de mock activation runbook ser tratado como runbook executável.',
      'R-FGD-03: Risco de traffic switch simulation ser confundida com alteração de rota.',
      'R-FGD-04: Risco de rollback simulation ser interpretado como rollback instalado.',
      'R-FGD-05: Risco de kill-switch simulation ser confundido com kill-switch produtivo.',
      'R-FGD-06: Risco de Produção V2 ser ativada por flag externa.',
      'R-FGD-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
