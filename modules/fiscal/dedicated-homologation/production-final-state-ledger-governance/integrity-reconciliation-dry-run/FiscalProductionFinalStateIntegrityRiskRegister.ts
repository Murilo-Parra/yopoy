export class FiscalProductionFinalStateIntegrityRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFSI-01: Risco de integrity review virtual parecer verificação real.',
      'R-PFSI-02: Risco de reconciliation simulation parecer reconciliação de dados reais.',
      'R-PFSI-03: Risco de drift matrix parecer detecção real de drift.',
      'R-PFSI-04: Risco de no-read plan ser ignorado por automação externa.',
      'R-PFSI-05: Risco de digest no-hash parecer digest validado.',
      'R-PFSI-06: Risco de signature no-verify parecer assinatura jurídica verificada.',
      'R-PFSI-07: Risco de no-proof plan parecer proof criptográfica emitida.',
      'R-PFSI-08: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFSI-09: Risco de automação externa ignorar approvedForRealIntegrityVerification=false.',
      'R-PFSI-10: Risco de automação externa ignorar approvedForRealDataReconciliation=false.',
      'R-PFSI-11: Risco de automação externa ignorar approvedForRealProofCreation=false.',
      'R-PFSI-12: Risco de lint global falho ser confundido com falha do 42.3.',
      'R-PFSI-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFSI-14: Risco de testes temporários permanecerem no repositório.',
      'R-PFSI-15: Risco de diretoria interpretar consistência virtual como validação final de produção.'
    ];
  }
}
