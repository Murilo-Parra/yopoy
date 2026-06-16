export class FiscalProductionCrossDomainSealEvidenceRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PCDSE-01: Risco de agregação transversal parecer certificação real de produção.',
      'R-PCDSE-02: Risco de revalidação de ausência de autoridade parecer autorização real.',
      'R-PCDSE-03: Risco de evidence aggregation parecer readiness real de go-live.',
      'R-PCDSE-04: Risco de no-real-activation evidence parecer ativação tecnicamente validada.',
      'R-PCDSE-05: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PCDSE-06: Risco de automação externa ignorar approvedForRealSeal=false.',
      'R-PCDSE-07: Risco de automação externa ignorar approvedForRealAuthorityRevalidation=false.',
      'R-PCDSE-08: Risco de automação externa ignorar approvedForEvidenceToAuthorityConversion=false.',
      'R-PCDSE-09: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PCDSE-10: Risco de automação externa ignorar approvedForProductionV2=false.',
      'R-PCDSE-11: Risco de lint global falho ser confundido com falha do 45.2.',
      'R-PCDSE-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PCDSE-13: Risco de testes temporários permanecerem no repositório.',
      'R-PCDSE-14: Risco de diretoria interpretar a matriz agregada como autorização final.'
    ];
  }
}
