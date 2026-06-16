export class FiscalProductionPostSealDormantStateRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPSDS-01: Risco de dormant state parecer ambiente pronto para retomada operacional.',
      'R-PPSDS-02: Risco de permanent non-resumption contract parecer autorização final de encerramento legal.',
      'R-PPSDS-03: Risco de no-reentry boundary parecer caminho técnico de reentrada.',
      'R-PPSDS-04: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PPSDS-05: Risco de automação externa ignorar approvedForRealAuthorityResumption=false.',
      'R-PPSDS-06: Risco de automação externa ignorar approvedForRealActivationResumption=false.',
      'R-PPSDS-07: Risco de automação externa ignorar approvedForRealRoutingResumption=false.',
      'R-PPSDS-08: Risco de automação externa ignorar approvedForRealRuntimeResumption=false.',
      'R-PPSDS-09: Risco de automação externa ignorar approvedForRealDatabaseResumption=false.',
      'R-PPSDS-10: Risco de automação externa ignorar approvedForRealExternalIntegrationResumption=false.',
      'R-PPSDS-11: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PPSDS-12: Risco de lint global falho ser confundido com falha do 46.1.',
      'R-PPSDS-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PPSDS-14: Risco de testes temporários permanecerem no repositório.',
      'R-PPSDS-15: Risco de diretoria interpretar o estado dormente como etapa técnica pronta para reativação.'
    ];
  }
}
