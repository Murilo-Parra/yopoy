export class FiscalProductionFinalStateLedgerRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFSL-01: Risco de ledger virtual parecer ledger real de produção.',
      'R-PFSL-02: Risco de immutable no-activation record parecer registro legal real.',
      'R-PFSL-03: Risco de no-persistence plan ser ignorado por automação externa.',
      'R-PFSL-04: Risco de no-real-hash plan parecer hash validado.',
      'R-PFSL-05: Risco de no-real-signature plan parecer assinatura jurídica.',
      'R-PFSL-06: Risco de final state matrix parecer autorização final de go-live.',
      'R-PFSL-07: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFSL-08: Risco de automação externa ignorar approvedForRealLedgerCreation=false.',
      'R-PFSL-09: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PFSL-10: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PFSL-11: Risco de lint global falho ser confundido com falha do 42.1.',
      'R-PFSL-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFSL-13: Risco de testes temporários permanecerem no repositório.',
      'R-PFSL-14: Risco de diretoria interpretar ledger final como liberação operacional.',
      'R-PFSL-15: Risco de nomenclatura "immutable" ser confundida com persistência real.'
    ];
  }
}
