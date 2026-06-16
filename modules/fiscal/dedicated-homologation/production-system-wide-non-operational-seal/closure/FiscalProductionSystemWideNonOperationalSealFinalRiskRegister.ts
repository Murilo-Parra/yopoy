export class FiscalProductionSystemWideNonOperationalSealFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PSWNSC-01: Risco de closure documental parecer closure operacional real.',
      'R-PSWNSC-02: Risco de no-authority evidence package parecer autorização final.',
      'R-PSWNSC-03: Risco de no-activation evidence package parecer ativação validada.',
      'R-PSWNSC-04: Risco de handoff documental parecer handoff operacional concluído.',
      'R-PSWNSC-05: Risco de post-closure roadmap parecer continuidade operacional pronta.',
      'R-PSWNSC-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PSWNSC-07: Risco de automação externa ignorar approvedForRealClosure=false.',
      'R-PSWNSC-08: Risco de automação externa ignorar approvedForRealAuthority=false.',
      'R-PSWNSC-09: Risco de automação externa ignorar approvedForRealOperationalHandoff=false.',
      'R-PSWNSC-10: Risco de automação externa ignorar approvedForRealActivationHandoff=false.',
      'R-PSWNSC-11: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PSWNSC-12: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PSWNSC-13: Risco de lint global falho ser confundido com falha do 45.5.',
      'R-PSWNSC-14: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PSWNSC-15: Risco de testes temporários permanecerem no repositório.',
      'R-PSWNSC-16: Risco de diretoria interpretar o fechamento do Domínio 45 como liberação final de produção.'
    ];
  }
}
