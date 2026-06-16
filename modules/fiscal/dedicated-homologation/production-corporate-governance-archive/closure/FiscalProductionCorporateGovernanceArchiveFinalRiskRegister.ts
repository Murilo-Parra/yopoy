export class FiscalProductionCorporateGovernanceArchiveFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PCGAC-01: Risco de closure virtual parecer fechamento operacional real.',
      'R-PCGAC-02: Risco de evidence package parecer dossiê oficial com valor legal.',
      'R-PCGAC-03: Risco de no-record handoff parecer persistência validada.',
      'R-PCGAC-04: Risco de no-notification handoff parecer ciência enviada.',
      'R-PCGAC-05: Risco de no-legal-effect notice ser omitido em dashboard executivo.',
      'R-PCGAC-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PCGAC-07: Risco de automação externa ignorar approvedForRealBoardApproval=false.',
      'R-PCGAC-08: Risco de automação externa ignorar approvedForRealRecordPersistence=false.',
      'R-PCGAC-09: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PCGAC-10: Risco de diretoria interpretar o closure como aprovação formal de produção.',
      'R-PCGAC-11: Risco de lint global falho ser confundido com falha do 43.3.',
      'R-PCGAC-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PCGAC-13: Risco de testes temporários permanecerem no repositório.',
      'R-PCGAC-14: Risco de relatório final ser arquivado como ata real indevida.'
    ];
  }
}
