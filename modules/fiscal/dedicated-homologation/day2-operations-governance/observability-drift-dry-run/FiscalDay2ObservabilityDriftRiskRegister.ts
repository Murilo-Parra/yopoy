export class FiscalDay2ObservabilityDriftRiskRegister {
  public static getRisks() {
    return [
      'R-D2OD-01: Risco de observability readiness simulation ser interpretada como observability instalada.',
      'R-D2OD-02: Risco de live metrics no-capture ser confundido com leitura real de métricas.',
      'R-D2OD-03: Risco de metrics drift detection simulation ser usada como avaliação real de SLO/SLA.',
      'R-D2OD-04: Risco de dashboard no-op ser interpretado como dashboard operacional criado.',
      'R-D2OD-05: Risco de alert rule no-activation ser convertida em alerta real por automação externa.',
      'R-D2OD-06: Risco de telemetry source no-read plan ser entendido como autorização de leitura de logs/traces.',
      'R-D2OD-07: Risco de metrics retention no-persistence ser confundida com persistência legal de métricas.',
      'R-D2OD-08: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-D2OD-09: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
