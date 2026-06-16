export class FiscalProductionTrafficArchitectureFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PTAC-01: Risco de closure do Domínio 39 ser interpretado como liberação de roteamento real.',
      'R-PTAC-02: Risco de evidence package ser interpretado como prova de tráfego real validado.',
      'R-PTAC-03: Risco de no-routing handoff ser interpretado como handoff operacional real.',
      'R-PTAC-04: Risco de route promotion dry-run ser confundido com route promotion real.',
      'R-PTAC-05: Risco de traffic slice simulation parecer alteração real de percentual.',
      'R-PTAC-06: Risco de canary routing no-activation parecer canary ativo.',
      'R-PTAC-07: Risco de load balancer/DNS no-change parecer validação em infraestrutura real.',
      'R-PTAC-08: Risco de proxy/shadow no-capture parecer shadow traffic real.',
      'R-PTAC-09: Risco de UI ocultar routeToV2=false, simulationOnly=true e activationBlocked=true.',
      'R-PTAC-10: Risco de automação externa ignorar approvedForRealRoutingExecution=false.',
      'R-PTAC-11: Risco de testes temporários permanecerem no repositório.',
      'R-PTAC-12: Risco de namespace/export colidir com domínios anteriores.',
      'R-PTAC-13: Risco de diretoria interpretar fechamento arquitetural como tráfego produtivo ativado.'
    ];
  }
}
