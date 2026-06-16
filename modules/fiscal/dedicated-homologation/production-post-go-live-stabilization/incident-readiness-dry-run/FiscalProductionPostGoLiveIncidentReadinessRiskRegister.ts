export class FiscalProductionPostGoLiveIncidentReadinessRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPGLIR-01: Risco de incident readiness ser interpretado como incidente real aberto.',
      'R-PPGLIR-02: Risco de runbook no-op parecer procedimento operacional executável.',
      'R-PPGLIR-03: Risco de severity simulation ser confundida com alerta produtivo real.',
      'R-PPGLIR-04: Risco de escalation no-notification parecer comunicação efetiva com SRE.',
      'R-PPGLIR-05: Risco de mitigation catalog ser usado como comando operacional.',
      'R-PPGLIR-06: Risco de post-incident review simulado parecer persistência real de RCA.',
      'R-PPGLIR-07: Risco de incident evidence no-capture ser lido como evidência real capturada.',
      'R-PPGLIR-08: Risco de UI ocultar realIncidentOpened=false e simulationOnly=true.',
      'R-PPGLIR-09: Risco de automação externa ignorar activationBlocked.',
      'R-PPGLIR-10: Risco de testes temporários permanecerem no repositório.',
      'R-PPGLIR-11: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPGLIR-12: Risco de diretoria interpretar readiness de incidente como operação pós-go-live real.'
    ];
  }
}
