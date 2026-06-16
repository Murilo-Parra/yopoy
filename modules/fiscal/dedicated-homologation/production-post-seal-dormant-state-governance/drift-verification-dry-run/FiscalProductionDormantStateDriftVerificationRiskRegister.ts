export class FiscalProductionDormantStateDriftVerificationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PDSDV-01: Risco de drift verification parecer scanner real.',
      'R-PDSDV-02: Risco de no-resume evidence parecer retomada validada.',
      'R-PDSDV-03: Risco de invariant audit parecer auditoria operacional real.',
      'R-PDSDV-04: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PDSDV-05: Risco de automação externa ignorar approvedForRealDriftScan=false.',
      'R-PDSDV-06: Risco de automação externa ignorar approvedForRealResumption=false.',
      'R-PDSDV-07: Risco de automação externa ignorar approvedForRealReentry=false.',
      'R-PDSDV-08: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PDSDV-09: Risco de automação externa ignorar approvedForRouteToV2=false.',
      'R-PDSDV-10: Risco de lint global falho ser confundido com falha do 46.3.',
      'R-PDSDV-11: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PDSDV-12: Risco de testes temporários permanecerem no repositório.',
      'R-PDSDV-13: Risco de diretoria interpretar drift verification como validação técnica real de produção.'
    ];
  }
}
