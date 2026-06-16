export class FiscalProductionGoLiveRollbackRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PGLR-01: Risco de rollback blueprint ser interpretado como rollback real.',
      'R-PGLR-02: Risco de abort no-op ser confundido com abort operacional.',
      'R-PGLR-03: Risco de fallback safety ser lido como fallback efetivo.',
      'R-PGLR-04: Risco de traffic reversion no-op parecer reversão real de tráfego.',
      'R-PGLR-05: Risco de V2 shutdown no-op parecer desligamento real.',
      'R-PGLR-06: Risco de trigger matrix ser tratada como incidente real.',
      'R-PGLR-07: Risco de UI ocultar routeToV2=false e simulationOnly=true.',
      'R-PGLR-08: Risco de automação externa ignorar activationBlocked.',
      'R-PGLR-09: Risco de testes temporários permanecerem no repositório.',
      'R-PGLR-10: Risco de namespace/export colidir com domínios anteriores.',
      'R-PGLR-11: Risco de logs administrativos serem confundidos com evento produtivo de rollback.'
    ];
  }
}
