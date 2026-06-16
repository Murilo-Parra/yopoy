export class FiscalProductionGovernanceRetentionRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PGRT-01: Risco de retenção virtual parecer retenção real.',
      'R-PGRT-02: Risco de custódia dormente parecer custódia oficial persistida.',
      'R-PGRT-03: Risco de lifecycle no-mutation parecer lifecycle aplicado.',
      'R-PGRT-04: Risco de legal hold no-apply parecer bloqueio jurídico real.',
      'R-PGRT-05: Risco de no-delete ser omitido em dashboard executivo.',
      'R-PGRT-06: Risco de no-export ser ignorado por automação externa.',
      'R-PGRT-07: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PGRT-08: Risco de automação externa ignorar approvedForRealRetentionCreation=false.',
      'R-PGRT-09: Risco de automação externa ignorar approvedForRealLifecycleMutation=false.',
      'R-PGRT-10: Risco de automação externa ignorar approvedForRealDeletion=false.',
      'R-PGRT-11: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PGRT-12: Risco de lint global falho ser confundido com falha do 44.1.',
      'R-PGRT-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PGRT-14: Risco de testes temporários permanecerem no repositório.',
      'R-PGRT-15: Risco de diretoria interpretar a retenção virtual como política oficial aplicada em produção.'
    ];
  }
}
