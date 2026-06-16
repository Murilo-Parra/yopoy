export class FiscalProductionProxyShadowRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PPSH-01: Risco de blueprint de proxy parecer proxy real instalado.',
      'R-PPSH-02: Risco de middleware no-install parecer middleware aplicado.',
      'R-PPSH-03: Risco de tap/mirror/sniffer no-activation parecer captura ativa.',
      'R-PPSH-04: Risco de shadow traffic no-capture parecer tráfego sombra real.',
      'R-PPSH-05: Risco de request/response matrix parecer coleta real de dados.',
      'R-PPSH-06: Risco de legacy handler plan parecer chamada real de handler legado.',
      'R-PPSH-07: Risco de V2 handler no-call parecer health check real da V2.',
      'R-PPSH-08: Risco de UI ocultar routeToV2=false e simulationOnly=true.',
      'R-PPSH-09: Risco de automação externa ignorar activationBlocked.',
      'R-PPSH-10: Risco de testes temporários permanecerem no repositório.',
      'R-PPSH-11: Risco de namespace/export colidir com domínios anteriores.',
      'R-PPSH-12: Risco de diretoria interpretar shadow dry-run como shadow traffic produtivo.'
    ];
  }
}
