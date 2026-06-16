export class FiscalProductionRetentionDormancyFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRDC-01: Risco de closure virtual parecer encerramento operacional real.',
      'R-PRDC-02: Risco de evidence package parecer pacote oficial persistido.',
      'R-PRDC-03: Risco de no-retention handoff parecer política real aplicada.',
      'R-PRDC-04: Risco de no-custody handoff parecer custódia oficial persistida.',
      'R-PRDC-05: Risco de no-disclosure handoff parecer disclosure oficial aprovado.',
      'R-PRDC-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PRDC-07: Risco de automação externa ignorar approvedForRealRetention=false.',
      'R-PRDC-08: Risco de automação externa ignorar approvedForRealCustody=false.',
      'R-PRDC-09: Risco de automação externa ignorar approvedForRealDisclosure=false.',
      'R-PRDC-10: Risco de automação externa ignorar approvedForRealExport=false.',
      'R-PRDC-11: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PRDC-12: Risco de lint global falho ser confundido com falha do 44.5.',
      'R-PRDC-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PRDC-14: Risco de testes temporários permanecerem no repositório.',
      'R-PRDC-15: Risco de diretoria interpretar o fechamento do Domínio 44 como retenção/custódia legalmente aplicada.'
    ];
  }
}
