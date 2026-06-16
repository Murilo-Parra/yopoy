export class FiscalDay2IncidentRunbookRiskRegister {
  public static getRisks() {
    return [
      'R-D2IR-01: Risco de incident response simulation ser interpretada como incidente real aberto.',
      'R-D2IR-02: Risco de runbook no-op ser confundido com execução real.',
      'R-D2IR-03: Risco de severity matrix ser usada como classificação operacional real.',
      'R-D2IR-04: Risco de escalation no-notification ser convertido em notificação real por automação externa.',
      'R-D2IR-05: Risco de mitigation catalog ser executado por automação externa.',
      'R-D2IR-06: Risco de post-incident review no-persistence ser confundido com auditoria legal definitiva.',
      'R-D2IR-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-D2IR-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
