export class FiscalProductionFinalStateDisclosureRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFSD-01: Risco de disclosure virtual parecer disclosure real.',
      'R-PFSD-02: Risco de pacote no-file parecer pacote exportado.',
      'R-PFSD-03: Risco de handoff no-export parecer handoff operacional concluído.',
      'R-PFSD-04: Risco de recipient eligibility parecer notificação real.',
      'R-PFSD-05: Risco de redaction no-read parecer inspeção real de payload.',
      'R-PFSD-06: Risco de no-external-submission ser ignorado por automação externa.',
      'R-PFSD-07: Risco de no-notification ser ocultado por UI.',
      'R-PFSD-08: Risco de no-legal-effect notice ser omitido em dashboard executivo.',
      'R-PFSD-09: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFSD-10: Risco de automação externa ignorar approvedForRealDisclosureExport=false.',
      'R-PFSD-11: Risco de automação externa ignorar approvedForRealExternalSubmission=false.',
      'R-PFSD-12: Risco de automação externa ignorar approvedForRealNotification=false.',
      'R-PFSD-13: Risco de lint global falho ser confundido com falha do 42.4.',
      'R-PFSD-14: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFSD-15: Risco de testes temporários permanecerem no repositório.',
      'R-PFSD-16: Risco de diretoria interpretar disclosure final como dossiê oficial enviado.'
    ];
  }
}
