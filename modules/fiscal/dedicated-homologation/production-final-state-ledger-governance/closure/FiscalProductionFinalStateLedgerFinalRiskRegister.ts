export class FiscalProductionFinalStateLedgerFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFSLC-01: Risco de closure virtual parecer closure operacional real.',
      'R-PFSLC-02: Risco de evidence package parecer dossiê oficial com efeito jurídico.',
      'R-PFSLC-03: Risco de no-activation handoff parecer autorização de go-live.',
      'R-PFSLC-04: Risco de no-persistence handoff parecer persistência validada.',
      'R-PFSLC-05: Risco de no-legal-effect notice ser omitido em dashboard executivo.',
      'R-PFSLC-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFSLC-07: Risco de automação externa ignorar approvedForRealClosureExecution=false.',
      'R-PFSLC-08: Risco de automação externa ignorar approvedForRealLedgerPersistence=false.',
      'R-PFSLC-09: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PFSLC-10: Risco de diretoria interpretar fechamento documental como liberação final de produção.',
      'R-PFSLC-11: Risco de lint global falho ser confundido com falha do 42.5.',
      'R-PFSLC-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFSLC-13: Risco de testes temporários permanecerem no repositório.',
      'R-PFSLC-14: Risco de relatório final ser arquivado como prova jurídica indevida.'
    ];
  }
}
