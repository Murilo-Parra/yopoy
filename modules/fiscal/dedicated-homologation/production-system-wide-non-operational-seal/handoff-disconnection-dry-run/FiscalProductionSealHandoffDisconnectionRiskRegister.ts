export class FiscalProductionSealHandoffDisconnectionRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PSWHD-01: Risco de handoff disconnection parecer handoff operacional concluído.',
      'R-PSWHD-02: Risco de continuation suppression parecer continuidade operacional preparada.',
      'R-PSWHD-03: Risco de final non-operational boundary parecer etapa final de go-live.',
      'R-PSWHD-04: Risco de output virtual do selo parecer autorização de produção.',
      'R-PSWHD-05: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PSWHD-06: Risco de automação externa ignorar approvedForRealOperationalHandoff=false.',
      'R-PSWHD-07: Risco de automação externa ignorar approvedForRealOperationalContinuation=false.',
      'R-PSWHD-08: Risco de automação externa ignorar approvedForRealAuthorityPropagation=false.',
      'R-PSWHD-09: Risco de automação externa ignorar approvedForRealActivationPath=false.',
      'R-PSWHD-10: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PSWHD-11: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PSWHD-12: Risco de lint global falho ser confundido com falha do 45.4.',
      'R-PSWHD-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PSWHD-14: Risco de testes temporários permanecerem no repositório.',
      'R-PSWHD-15: Risco de diretoria interpretar a fronteira final não operacional como liberação final.'
    ];
  }
}
