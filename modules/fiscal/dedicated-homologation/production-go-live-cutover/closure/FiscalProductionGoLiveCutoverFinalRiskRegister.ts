export class FiscalProductionGoLiveCutoverFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PGLCC-01: Risco de closure ser interpretado como go-live real concluído.',
      'R-PGLCC-02: Risco de evidence package ser confundido com autorização operacional.',
      'R-PGLCC-03: Risco de no-activation handoff ser lido como handoff real.',
      'R-PGLCC-04: Risco de post-closure roadmap ser tratado como plano de ativação técnica.',
      'R-PGLCC-05: Risco de UI ocultar routeToV2=false, go=false e activationBlocked=true.',
      'R-PGLCC-06: Risco de automação externa ignorar simulationOnly.',
      'R-PGLCC-07: Risco de diretoria interpretar GO documental como liberação produtiva.',
      'R-PGLCC-08: Risco de testes temporários permanecerem no repositório.',
      'R-PGLCC-09: Risco de namespace/export colidir com domínios anteriores.',
      'R-PGLCC-10: Risco de logs administrativos serem confundidos com evento produtivo de closure.'
    ];
  }
}
