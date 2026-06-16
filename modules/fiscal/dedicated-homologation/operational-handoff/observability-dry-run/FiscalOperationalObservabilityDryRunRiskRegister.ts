export class FiscalOperationalObservabilityDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-OOD-01: Risco de observability readiness ser interpretada como instalação real.',
      'R-OOD-02: Risco de alerting dry-run ser confundido com alerta produtivo.',
      'R-OOD-03: Risco de incident trigger simulation ser tratado como incidente aberto.',
      'R-OOD-04: Risco de communication/escalation signals gerarem notificação externa sem novo gate.',
      'R-OOD-05: Risco de dashboards documentais ocultarem ausência de métricas reais.',
      'R-OOD-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
