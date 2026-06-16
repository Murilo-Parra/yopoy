export class FiscalProductionPostSealDormantStateFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PDSC-01: Risco de closure parecer encerramento operacional real.',
      'R-PDSC-02: Risco de handoff parecer transferência real para operação.',
      'R-PDSC-03: Risco de evidence package parecer prova legal real.',
      'R-PDSC-04: Risco de dashboard ocultar activationBlocked=true.',
      'R-PDSC-05: Risco de automação externa ignorar approvedForRealReentry=false.',
      'R-PDSC-06: Risco de automação externa ignorar approvedForRealResumption=false.',
      'R-PDSC-07: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PDSC-08: Risco de automação externa ignorar approvedForRealHandoff=false.',
      'R-PDSC-09: Risco de lint global falho ser confundido com falha do 46.5.',
      'R-PDSC-10: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PDSC-11: Risco de diretoria interpretar o closure como autorização real.',
      'R-PDSC-12: Risco de testes temporários permanecerem no repositório.'
    ];
  }
}
