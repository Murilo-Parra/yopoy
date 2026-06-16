export class FiscalProductionOperationsSupportRunbookRiskRegister {
  public static getRisks() {
    return [
      'R-POSR-01: Risco de support runbook dry-run ser interpretado como runbook ativo.',
      'R-POSR-02: Risco de incident triage simulation ser confundida com incidente real aberto.',
      'R-POSR-03: Risco de escalation no-notification ser interpretado como notificação real.',
      'R-POSR-04: Risco de mitigation no-op catalog ser usado por automação externa como ação real.',
      'R-POSR-05: Risco de post-incident review sem persistência ser confundido com registro oficial.',
      'R-POSR-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSR-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
