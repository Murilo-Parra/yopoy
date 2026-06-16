export class FiscalProductionRuntimeExecutionFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PREC-01: Risco de runtime closure ser interpretado como execução autorizada.',
      'R-PREC-02: Risco de final evidence package ser tratado como permissão operacional.',
      'R-PREC-03: Risco de no-execution handoff ser confundido com gate destravado.',
      'R-PREC-04: Risco de roadmap pós-closure ser usado por automações externas como plano executável.',
      'R-PREC-05: Risco de checklist final ser interpretado como Go-Live.',
      'R-PREC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PREC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.',
      'R-PREC-08: Risco de painéis externos confundirem runtime no-op com runtime ativo.'
    ];
  }
}
