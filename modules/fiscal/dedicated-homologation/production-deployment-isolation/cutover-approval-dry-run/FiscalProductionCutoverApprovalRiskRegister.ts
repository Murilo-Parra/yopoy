export class FiscalProductionCutoverApprovalRiskRegister {
  public static getRisks() {
    return [
      'R-PCA-01: Risco de cutover approval dry-run ser interpretado como aprovação real.',
      'R-PCA-02: Risco de rollback governance plan ser confundido com rollback instalado.',
      'R-PCA-03: Risco de GO/NO-GO matrix ser usada como autorização produtiva definitiva.',
      'R-PCA-04: Risco de change window readiness ser interpretada como janela real aberta.',
      'R-PCA-05: Risco de abort criteria ser tratado como automação real.',
      'R-PCA-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
