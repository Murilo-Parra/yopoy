export class FiscalProductionPostGoLiveStabilizationFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPGLC-01: Risco de closure ser interpretado como encerramento operacional real.',
      'R-PPGLC-02: Risco de evidence package ser confundido com evidência produtiva capturada.',
      'R-PPGLC-03: Risco de no-activation handoff parecer autorização real.',
      'R-PPGLC-04: Risco de post-closure roadmap parecer agenda operacional executável.',
      'R-PPGLC-05: Risco de UI ocultar productionV2Activated=false.',
      'R-PPGLC-06: Risco de UI ocultar routeToV2=false e simulationOnly=true.',
      'R-PPGLC-07: Risco de automação externa ignorar activationBlocked.',
      'R-PPGLC-08: Risco de testes temporários permanecerem no repositório.',
      'R-PPGLC-09: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPGLC-10: Risco de diretoria interpretar estabilização pós-go-live como produção real ativa.'
    ];
  }
}
