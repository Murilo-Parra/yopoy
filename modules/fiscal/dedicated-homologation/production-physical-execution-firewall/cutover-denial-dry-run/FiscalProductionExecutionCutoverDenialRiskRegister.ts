export class FiscalProductionExecutionCutoverDenialRiskRegister {
  public static getRisks() {
    return [
      'R-PECD-01: Risco de cutover denial matrix ser interpretada como execução controlada de cutover.',
      'R-PECD-02: Risco de emergency containment no-op ser confundido com kill-switch real.',
      'R-PECD-03: Risco de rollback no-op matrix ser confundida com rollback executável.',
      'R-PECD-04: Risco de legacy continuity matrix ser usada como configuração real de roteamento.',
      'R-PECD-05: Risco de no-traffic-mutation evidence ser usado por automação externa como sinal de segurança produtiva.',
      'R-PECD-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PECD-07: Risco de testes temporários permanecerem no repositório.',
      'R-PECD-08: Risco de namespace/export colidir com Domain 32, 33, 34.1, 34.2 ou 34.3 em barrels globais.',
      'R-PECD-09: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().',
      'R-PECD-10: Risco de equipe externa interpretar contenção simulada como hardening real de runtime.'
    ];
  }
}
