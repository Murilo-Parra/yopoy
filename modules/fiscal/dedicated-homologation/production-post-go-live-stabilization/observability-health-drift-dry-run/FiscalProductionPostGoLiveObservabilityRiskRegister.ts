export class FiscalProductionPostGoLiveObservabilityRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPGLO-01: Risco de observability review ser interpretado como observability real instalada.',
      'R-PPGLO-02: Risco de health drift simulation ser confundida com telemetria real.',
      'R-PPGLO-03: Risco de SLO/SLA review ser lido como avaliação real-time.',
      'R-PPGLO-04: Risco de dashboard no-creation parecer dashboard real disponível.',
      'R-PPGLO-05: Risco de alert rule no-activation parecer alerta produtivo armado.',
      'R-PPGLO-06: Risco de metrics retention no-persistence parecer retenção real.',
      'R-PPGLO-07: Risco de no-real-metrics evidence ser confundido com captura real sanitizada.',
      'R-PPGLO-08: Risco de UI ocultar realMetricsCaptured=false e simulationOnly=true.',
      'R-PPGLO-09: Risco de automação externa ignorar activationBlocked.',
      'R-PPGLO-10: Risco de testes temporários permanecerem no repositório.',
      'R-PPGLO-11: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPGLO-12: Risco de diretoria interpretar observability pós-go-live como operação real.'
    ];
  }
}
