export class FiscalProductionTrafficArchitectureRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PTAG-01: Risco de blueprint de tráfego ser interpretado como roteamento real.',
      'R-PTAG-02: Risco de topology inventory parecer leitura real de tráfego.',
      'R-PTAG-03: Risco de legacy preservation parecer chamada real de handler legado.',
      'R-PTAG-04: Risco de V2 locked plan parecer ativação parcial.',
      'R-PTAG-05: Risco de load balancer no-change parecer configuração real validada.',
      'R-PTAG-06: Risco de DNS no-change parecer alteração aplicada.',
      'R-PTAG-07: Risco de shadow traffic no-activation parecer espelhamento ativo.',
      'R-PTAG-08: Risco de UI ocultar routeToV2=false e simulationOnly=true.',
      'R-PTAG-09: Risco de automação externa ignorar activationBlocked.',
      'R-PTAG-10: Risco de testes temporários permanecerem no repositório.',
      'R-PTAG-11: Risco de namespace/export colidir com domínios anteriores.',
      'R-PTAG-12: Risco de diretoria interpretar arquitetura de tráfego como tráfego produtivo real.'
    ];
  }
}
