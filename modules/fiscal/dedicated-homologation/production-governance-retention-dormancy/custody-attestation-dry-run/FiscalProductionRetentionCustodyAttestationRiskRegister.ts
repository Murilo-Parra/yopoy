export class FiscalProductionRetentionCustodyAttestationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRCA-01: Risco de attestation virtual parecer atestado oficial real.',
      'R-PRCA-02: Risco de legal hold review parecer bloqueio jurídico aplicado.',
      'R-PRCA-03: Risco de no-deletion handoff parecer política real de retenção aplicada.',
      'R-PRCA-04: Risco de custody chain no-persistence parecer cadeia de custódia persistida.',
      'R-PRCA-05: Risco de no-notification ser omitido em dashboard executivo.',
      'R-PRCA-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PRCA-07: Risco de automação externa ignorar approvedForRealLegalHold=false.',
      'R-PRCA-08: Risco de automação externa ignorar approvedForRealDeletion=false.',
      'R-PRCA-09: Risco de automação externa ignorar approvedForRealRecordPersistence=false.',
      'R-PRCA-10: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PRCA-11: Risco de lint global falho ser confundido com falha do 44.2.',
      'R-PRCA-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PRCA-13: Risco de testes temporários permanecerem no repositório.',
      'R-PRCA-14: Risco de diretoria interpretar a revisão de custódia como retenção oficial aplicada.'
    ];
  }
}
