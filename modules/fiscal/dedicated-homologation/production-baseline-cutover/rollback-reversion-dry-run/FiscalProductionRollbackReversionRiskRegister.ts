export class FiscalProductionRollbackReversionRiskRegister {
  public static getRisks() {
    return [
      'R-PBR-01: Risco de rollback simulation ser interpretado como rollback real.',
      'R-PBR-02: Risco de abort no-op ser confundido com abort real.',
      'R-PBR-03: Risco de legacy reversion no-op ser usado por automação externa como troca real de tráfego.',
      'R-PBR-04: Risco de recovery matrix no-op sugerir runtime ativo.',
      'R-PBR-05: Risco de no-traffic-mutation evidence ocultar que nenhuma rota real foi alterada.',
      'R-PBR-06: Risco de rollback abort criteria ser interpretado como autorização operacional.',
      'R-PBR-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PBR-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
