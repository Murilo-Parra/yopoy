export class FiscalProductionExecutionAuthorizationFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PEAC-01: Risco de authorization closure ser interpretado como autorização real.',
      'R-PEAC-02: Risco de evidence package final ser tratado como permissão operacional.',
      'R-PEAC-03: Risco de no-execution handoff ser confundido com gate destravado.',
      'R-PEAC-04: Risco de roadmap pós-closure ser usado por automações externas como plano executável.',
      'R-PEAC-05: Risco de checklist final ser interpretado como Go-Live.',
      'R-PEAC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEAC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
