export class FiscalProductionReentryAttemptDenialRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRAD-01: Risco de reentry denial parecer teste real de reentrada.',
      'R-PRAD-02: Risco de resumption lock parecer mecanismo operacional de desbloqueio.',
      'R-PRAD-03: Risco de dormant continuity parecer continuidade operacional.',
      'R-PRAD-04: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PRAD-05: Risco de automação externa ignorar approvedForRealReentry=false.',
      'R-PRAD-06: Risco de automação externa ignorar approvedForRealResumptionUnlock=false.',
      'R-PRAD-07: Risco de automação externa ignorar approvedForRealAuthorityResumption=false.',
      'R-PRAD-08: Risco de automação externa ignorar approvedForRealActivationResumption=false.',
      'R-PRAD-09: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PRAD-10: Risco de automação externa ignorar approvedForRouteToV2=false.',
      'R-PRAD-11: Risco de lint global falho ser confundido com falha do 46.2.',
      'R-PRAD-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PRAD-13: Risco de testes temporários permanecerem no repositório.',
      'R-PRAD-14: Risco de diretoria interpretar a negação de reentrada como mecanismo pronto para reativação.'
    ];
  }
}
