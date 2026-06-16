export class FiscalProductionRoutePromotionRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PRP-01: Risco de blueprint de promoção parecer rota real promovida.',
      'R-PRP-02: Risco de traffic slice simulation parecer alteração real de percentual.',
      'R-PRP-03: Risco de canary routing no-activation parecer canary real ativo.',
      'R-PRP-04: Risco de routeToV2 blocked evidence parecer teste real de V2.',
      'R-PRP-05: Risco de legacy mandatory plan parecer chamada real ao legado.',
      'R-PRP-06: Risco de canary abort no-op parecer abort real executado.',
      'R-PRP-07: Risco de promotion criteria simulation parecer aprovação real.',
      'R-PRP-08: Risco de UI ocultar routeToV2=false e simulationOnly=true.',
      'R-PRP-09: Risco de automação externa ignorar activationBlocked.',
      'R-PRP-10: Risco de testes temporários permanecerem no repositório.',
      'R-PRP-11: Risco de namespace/export colidir com domínios anteriores.',
      'R-PRP-12: Risco de diretoria interpretar traffic slice dry-run como ativação produtiva gradual.'
    ];
  }
}
