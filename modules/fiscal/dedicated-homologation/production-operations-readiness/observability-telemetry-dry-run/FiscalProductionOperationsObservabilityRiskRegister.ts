export class FiscalProductionOperationsObservabilityRiskRegister {
  public static getRisks() {
    return [
      'R-POO-01: Risco de observability readiness ser interpretada como instalação real.',
      'R-POO-02: Risco de telemetry no-capture plan ser confundido com captura de métricas real.',
      'R-POO-03: Risco de live metrics drift simulation ser lido como métrica real.',
      'R-POO-04: Risco de alert rule no-activation plan ser usado por automação externa como alerta produtivo.',
      'R-POO-05: Risco de dashboard no-op ser confundido com dashboard operacional real.',
      'R-POO-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POO-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
