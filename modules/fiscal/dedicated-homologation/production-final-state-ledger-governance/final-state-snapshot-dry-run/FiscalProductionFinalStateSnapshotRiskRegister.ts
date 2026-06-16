export class FiscalProductionFinalStateSnapshotRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFSS-01: Risco de snapshot virtual parecer snapshot real de produção.',
      'R-PFSS-02: Risco de virtual ledger entry parecer entrada real de ledger.',
      'R-PFSS-03: Risco de attestation envelope parecer atestado jurídico real.',
      'R-PFSS-04: Risco de no-persistence plan ser ignorado por automação externa.',
      'R-PFSS-05: Risco de no-real-hash plan parecer hash validado.',
      'R-PFSS-06: Risco de no-real-signature plan parecer assinatura jurídica.',
      'R-PFSS-07: Risco de no-legal-proof notice ser ocultado pela UI.',
      'R-PFSS-08: Risco de final snapshot parecer autorização final de go-live.',
      'R-PFSS-09: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFSS-10: Risco de automação externa ignorar approvedForRealSnapshotCreation=false.',
      'R-PFSS-11: Risco de automação externa ignorar approvedForRealLedgerEntryCreation=false.',
      'R-PFSS-12: Risco de automação externa ignorar approvedForRealAttestationPersistence=false.',
      'R-PFSS-13: Risco de lint global falho ser confundido com falha do 42.2.',
      'R-PFSS-14: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFSS-15: Risco de testes temporários permanecerem no repositório.',
      'R-PFSS-16: Risco de diretoria interpretar snapshot final como liberação operacional.'
    ];
  }
}
