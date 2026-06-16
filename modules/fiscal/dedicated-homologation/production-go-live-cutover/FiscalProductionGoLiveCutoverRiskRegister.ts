export class FiscalProductionGoLiveCutoverRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PGLC-01: Risco de blueprint de go-live ser interpretado como execução real.',
      'R-PGLC-02: Risco de activation boundary no-op ser confundido com gate unlock real.',
      'R-PGLC-03: Risco de readiness matrix ser tratada como autorização de cutover.',
      'R-PGLC-04: Risco de traffic switch no-op ser interpretado como alteração real de rota.',
      'R-PGLC-05: Risco de V2 activation blocked plan ser exibido na UI como ativação pronta.',
      'R-PGLC-06: Risco de automação externa ignorar flags simulationOnly e activationBlocked.',
      'R-PGLC-07: Risco de testes temporários permanecerem no repositório.',
      'R-PGLC-08: Risco de namespace/export colidir com domínios anteriores.',
      'R-PGLC-09: Risco de diretoria entender “GO documental” como autorização técnica real.',
      'R-PGLC-10: Risco de logs administrativos serem confundidos com evento produtivo.'
    ];
  }
}
