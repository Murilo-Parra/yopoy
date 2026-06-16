export class FiscalProductionRuntimeStepDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-PRT-01: Risco de runtime step manifest ser interpretado como plano executável.',
      'R-PRT-02: Risco de command manifest ser convertido em comandos reais por automação externa.',
      'R-PRT-03: Risco de queue no-op plan ser tratado como fila real.',
      'R-PRT-04: Risco de worker no-op contract ser confundido com worker ativo.',
      'R-PRT-05: Risco de rollback plan documental ser interpretado como rollback executável.',
      'R-PRT-06: Risco de circuit breaker plan ser confundido com kill-switch instalado.',
      'R-PRT-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRT-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
