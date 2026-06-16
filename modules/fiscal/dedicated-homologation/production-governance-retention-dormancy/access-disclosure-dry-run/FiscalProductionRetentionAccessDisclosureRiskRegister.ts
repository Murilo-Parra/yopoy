export class FiscalProductionRetentionAccessDisclosureRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRAD-01: Risco de access review virtual parecer concessão real de acesso.',
      'R-PRAD-02: Risco de retrieval suppression parecer recuperação real validada.',
      'R-PRAD-03: Risco de disclosure eligibility parecer aprovação real de disclosure.',
      'R-PRAD-04: Risco de export package no-create parecer pacote real disponível.',
      'R-PRAD-05: Risco de download link no-issue parecer link real oculto.',
      'R-PRAD-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PRAD-07: Risco de automação externa ignorar approvedForRealAccessGrant=false.',
      'R-PRAD-08: Risco de automação externa ignorar approvedForRealRetrieval=false.',
      'R-PRAD-09: Risco de automação externa ignorar approvedForRealDisclosure=false.',
      'R-PRAD-10: Risco de automação externa ignorar approvedForRealExport=false.',
      'R-PRAD-11: Risco de automação externa ignorar approvedForRealDownload=false.',
      'R-PRAD-12: Risco de lint global falho ser confundido com falha do 44.4.',
      'R-PRAD-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PRAD-14: Risco de testes temporários permanecerem no repositório.',
      'R-PRAD-15: Risco de diretoria interpretar a revisão de acesso como trilha oficial de disclosure.'
    ];
  }
}
