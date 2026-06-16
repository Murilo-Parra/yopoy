export class FiscalProductionPostGoLiveRemediationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPGLR-01: Risco de war room drill ser interpretado como war room real ativada.',
      'R-PPGLR-02: Risco de remediation readiness parecer plano operacional executável.',
      'R-PPGLR-03: Risco de mitigation playbook ser usado como comando real.',
      'R-PPGLR-04: Risco de support handover parecer handover operacional concluído.',
      'R-PPGLR-05: Risco de support role matrix ser interpretada como RBAC real.',
      'R-PPGLR-06: Risco de assisted session no-open parecer sessão real de suporte.',
      'R-PPGLR-07: Risco de stabilization decision parecer autorização real.',
      'R-PPGLR-08: Risco de comunicação no-send parecer comunicação real enviada.',
      'R-PPGLR-09: Risco de UI ocultar realRemediationExecuted=false e simulationOnly=true.',
      'R-PPGLR-10: Risco de automação externa ignorar activationBlocked.',
      'R-PPGLR-11: Risco de testes temporários permanecerem no repositório.',
      'R-PPGLR-12: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPGLR-13: Risco de diretoria interpretar war room pós-go-live como operação real.'
    ];
  }
}
