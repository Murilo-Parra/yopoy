export class FiscalProductionRetentionLifecycleDriftRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRLD-01: Risco de lifecycle drift virtual parecer mutação real de lifecycle.',
      'R-PRLD-02: Risco de expiration window no-evaluate parecer avaliação real de TTL.',
      'R-PRLD-03: Risco de deletion eligibility no-execute parecer autorização real de deleção.',
      'R-PRLD-04: Risco de policy version no-apply parecer política aplicada.',
      'R-PRLD-05: Risco de archive state transition no-op parecer reclassificação efetiva.',
      'R-PRLD-06: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PRLD-07: Risco de automação externa ignorar approvedForRealExpirationEvaluation=false.',
      'R-PRLD-08: Risco de automação externa ignorar approvedForRealDeletionExecution=false.',
      'R-PRLD-09: Risco de automação externa ignorar approvedForRealLifecycleMutation=false.',
      'R-PRLD-10: Risco de automação externa ignorar approvedForRealRetentionPolicyApplication=false.',
      'R-PRLD-11: Risco de automação externa ignorar approvedForRealGoLiveExecution=false.',
      'R-PRLD-12: Risco de lint global falho ser confundido com falha do 44.3.',
      'R-PRLD-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PRLD-14: Risco de testes temporários permanecerem no repositório.',
      'R-PRLD-15: Risco de diretoria interpretar a revisão de drift como governança de retenção aplicada em produção.'
    ];
  }
}
