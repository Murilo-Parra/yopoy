export class FiscalProductionCorporateGovernanceArchiveRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PCGA-01: Risco de archive virtual parecer archive real.',
      'R-PCGA-02: Risco de continuity record parecer registro corporativo oficial.',
      'R-PCGA-03: Risco de aggregation matrix parecer validação operacional real dos domínios.',
      'R-PCGA-04: Risco de no-file plan ser ignorado por automação externa.',
      'R-PCGA-05: Risco de no-legal-effect notice ser omitido em dashboard executivo.',
      'R-PCGA-06: Risco de no-export plan parecer exportação realizada.',
      'R-PCGA-07: Risco de recipient matrix parecer notificação enviada.',
      'R-PCGA-08: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PCGA-09: Risco de automação externa ignorar approvedForRealArchiveCreation=false.',
      'R-PCGA-10: Risco de automação externa ignorar approvedForRealExport=false.',
      'R-PCGA-11: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PCGA-12: Risco de lint global falho ser confundido com falha do 43.1.',
      'R-PCGA-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PCGA-14: Risco de testes temporários permanecerem no repositório.',
      'R-PCGA-15: Risco de diretoria interpretar o archive virtual como registro oficial de produção.'
    ];
  }
}
