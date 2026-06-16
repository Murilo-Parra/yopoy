export class FiscalProductionBaselineCutoverFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PBCF-01: Risco de closure do Domínio 30 ser interpretado como cutover real concluído.',
      'R-PBCF-02: Risco de final evidence package ser confundido com autorização operacional.',
      'R-PBCF-03: Risco de no-activation handoff ser usado por automação externa como sinal de go-live.',
      'R-PBCF-04: Risco de roadmap pós-closure sugerir ativação iminente.',
      'R-PBCF-05: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PBCF-06: Risco de diretoria interpretar readiness, approval, orchestration e rollback dry-run como execução efetiva.',
      'R-PBCF-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
