export class FiscalDay2OperationsRiskRegister {
  public static getRisks() {
    return [
      'R-D2O-01: Risco de blueprint day-2 ser interpretado como operação ativa.',
      'R-D2O-02: Risco de runbook readiness ser confundido com runbook executado.',
      'R-D2O-03: Risco de incident readiness ser tratado como incidente real.',
      'R-D2O-04: Risco de alerting no-op ser convertido em alerta real por automação externa.',
      'R-D2O-05: Risco de observability no-op ser interpretada como instalação real.',
      'R-D2O-06: Risco de escalation matrix ser usada para notificação real.',
      'R-D2O-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-D2O-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
