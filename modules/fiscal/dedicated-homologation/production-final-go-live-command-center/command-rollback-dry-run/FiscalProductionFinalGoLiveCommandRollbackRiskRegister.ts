export class FiscalProductionFinalGoLiveCommandRollbackRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFGCR-01: Risco de rollback scenario parecer rollback real disponível.',
      'R-PFGCR-02: Risco de abort path parecer abort operacional real.',
      'R-PFGCR-03: Risco de post-command event horizon parecer execução pós-comando real.',
      'R-PFGCR-04: Risco de fallback denial parecer fallback validado em produção.',
      'R-PFGCR-05: Risco de traffic reversion denial parecer teste real de reversão de tráfego.',
      'R-PFGCR-06: Risco de runtime containment denial parecer kill-switch real instalado.',
      'R-PFGCR-07: Risco de emergency hold parecer autorização parcial.',
      'R-PFGCR-08: Risco de legacy continuity parecer fallback executado.',
      'R-PFGCR-09: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFGCR-10: Risco de automação externa ignorar approvedForRealRollbackExecution=false.',
      'R-PFGCR-11: Risco de lint global falho ser confundido com falha do 41.4.',
      'R-PFGCR-12: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFGCR-13: Risco de testes temporários permanecerem no repositório.',
      'R-PFGCR-14: Risco de diretoria interpretar abort/rollback simulation como plano operacional autorizado.'
    ];
  }
}
