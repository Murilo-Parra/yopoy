export class FiscalProductionRuntimeQueueUnlockRiskRegister {
  public static getRisks() {
    return [
      'R-PRQ-01: Risco de queue unlock simulation ser interpretada como fila real destravada.',
      'R-PRQ-02: Risco de queue state simulation ser confundido com broker real.',
      'R-PRQ-03: Risco de dispatch eligibility ser interpretada como autorização real de worker.',
      'R-PRQ-04: Risco de worker no-op plan ser confundido com worker ativo.',
      'R-PRQ-05: Risco de no-job-enqueue evidence ser tratado como log operacional real.',
      'R-PRQ-06: Risco de command dispatch boundary ser convertido em executor externo.',
      'R-PRQ-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRQ-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
