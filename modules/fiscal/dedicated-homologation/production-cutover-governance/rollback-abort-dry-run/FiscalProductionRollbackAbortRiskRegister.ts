export class FiscalProductionRollbackAbortRiskRegister {
  public static getRisks() {
    return [
      'R-PRBA-01: Risco de rollback matrix simulation ser interpretada como rollback instalado.',
      'R-PRBA-02: Risco de cutover abort no-op ser confundido com abort real executável.',
      'R-PRBA-03: Risco de rollback scenario catalog ser tratado como evento operacional real.',
      'R-PRBA-04: Risco de legacy continuity plan ser ignorado por leitura parcial do dashboard.',
      'R-PRBA-05: Risco de no-real-rollback evidence ser usada como permissão operacional.',
      'R-PRBA-06: Risco de traffic recovery matrix ser convertido em ação ativa por automação externa.',
      'R-PRBA-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRBA-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
