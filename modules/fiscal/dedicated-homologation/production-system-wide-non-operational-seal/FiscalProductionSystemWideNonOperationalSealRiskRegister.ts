export class FiscalProductionSystemWideNonOperationalSealRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PSWNS-01: Risco de selo virtual parecer selo real de produção.',
      'R-PSWNS-02: Risco de activation impossibility contract parecer autorização jurídica definitiva.',
      'R-PSWNS-03: Risco de aggregation matrix parecer readiness real de go-live.',
      'R-PSWNS-04: Risco de evidence package parecer pacote oficial persistido.',
      'R-PSWNS-05: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PSWNS-06: Risco de automação externa ignorar approvedForRealSystemSeal=false.',
      'R-PSWNS-07: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PSWNS-08: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PSWNS-09: Risco de automação externa ignorar approvedForRouteToV2=false.',
      'R-PSWNS-10: Risco de lint global falho ser confundido com falha do 45.1.',
      'R-PSWNS-11: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PSWNS-12: Risco de testes temporários permanecerem no repositório.',
      'R-PSWNS-13: Risco de diretoria interpretar o selo virtual como liberação final de produção.'
    ];
  }
}
