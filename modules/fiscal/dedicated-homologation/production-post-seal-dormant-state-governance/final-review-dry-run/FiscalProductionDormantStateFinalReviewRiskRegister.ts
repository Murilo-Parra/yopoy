export class FiscalProductionDormantStateFinalReviewRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PDSFR-01: Risco de final review parecer aprovação executiva real.',
      'R-PDSFR-02: Risco de acknowledgement parecer assinatura vinculante.',
      'R-PDSFR-03: Risco de no-legal-effect notice ser ignorado por UI.',
      'R-PDSFR-04: Risco de ata simulada ser confundida com ata formal.',
      'R-PDSFR-05: Risco de dashboard ocultar activationBlocked=true e simulationOnly=true.',
      'R-PDSFR-06: Risco de automação externa ignorar approvedForRealExecutiveApproval=false.',
      'R-PDSFR-07: Risco de automação externa ignorar approvedForRealAcknowledgement=false.',
      'R-PDSFR-08: Risco de automação externa ignorar approvedForRealHandoff=false.',
      'R-PDSFR-09: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PDSFR-10: Risco de lint global falho ser confundido com falha do 46.4.',
      'R-PDSFR-11: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PDSFR-12: Risco de testes temporários permanecerem no repositório.',
      'R-PDSFR-13: Risco de diretoria interpretar a revisão final como autorização real.'
    ];
  }
}
