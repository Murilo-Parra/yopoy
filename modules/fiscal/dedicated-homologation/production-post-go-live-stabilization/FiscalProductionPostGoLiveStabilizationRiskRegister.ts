export class FiscalProductionPostGoLiveStabilizationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPGLS-01: Risco de stabilization blueprint ser interpretado como observação real.',
      'R-PPGLS-02: Risco de health matrix ser confundida com métrica real.',
      'R-PPGLS-03: Risco de no-activation observation ser tratado como autorização de produção.',
      'R-PPGLS-04: Risco de legacy continuity parecer fallback real executado.',
      'R-PPGLS-05: Risco de rollback readiness parecer plano operacional acionável.',
      'R-PPGLS-06: Risco de incident readiness parecer abertura real de incidente.',
      'R-PPGLS-07: Risco de UI ocultar routeToV2=false, productionV2Activated=false e simulationOnly=true.',
      'R-PPGLS-08: Risco de automação externa ignorar activationBlocked.',
      'R-PPGLS-09: Risco de testes temporários permanecerem no repositório.',
      'R-PPGLS-10: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPGLS-11: Risco de diretoria interpretar o início do Domínio 38 como pós-go-live real.'
    ];
  }
}
