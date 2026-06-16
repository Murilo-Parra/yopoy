export class FiscalProductionPhysicalExecutionFirewallBlockerRegister {
  public static getBlockers() {
    return [
      'B-PPEF-01: Firewall físico de execução não pode ser bypassado.',
      'B-PPEF-02: Execução física real bloqueada.',
      'B-PPEF-03: Runtime/queue/job/worker reais bloqueados.',
      'B-PPEF-04: Command runner/shell reais bloqueados.',
      'B-PPEF-05: Banco real e transações reais bloqueados.',
      'B-PPEF-06: DDL/DML reais bloqueados.',
      'B-PPEF-07: SEFAZ real bloqueada.',
      'B-PPEF-08: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PPEF-09: Crypto/XML/PDF reais bloqueados.',
      'B-PPEF-10: Gate real, autorização real e token real bloqueados.',
      'B-PPEF-11: Produção V2 e routeToV2 bloqueados.',
      'B-PPEF-12: Legado obrigatório preservado.',
      'B-PPEF-13: Tráfego real e promoção real de tráfego bloqueados.',
      'B-PPEF-14: Canary/cutover/go-live/rollout/rollback reais bloqueados.',
      'B-PPEF-15: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PPEF-16: Captura/duplicação/shadow/mirror reais bloqueados.',
      'B-PPEF-17: Notificações reais bloqueadas.',
      'B-PPEF-18: Payload e dados sensíveis bloqueados.'
    ];
  }
}
