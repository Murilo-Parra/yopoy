export class FiscalProductionExecutionFirewallApprovalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEFA-01: Aprovação executiva real bloqueada.',
      'B-PEFA-02: Approval record real bloqueado.',
      'B-PEFA-03: Assinatura real bloqueada.',
      'B-PEFA-04: Gate real, autorização real e token real bloqueados.',
      'B-PEFA-05: Scanner real de infraestrutura bloqueado.',
      'B-PEFA-06: Runtime/queue/job/worker reais bloqueados.',
      'B-PEFA-07: Command runner/shell reais bloqueados.',
      'B-PEFA-08: Banco real e transações reais bloqueados.',
      'B-PEFA-09: DDL/DML reais bloqueados.',
      'B-PEFA-10: SEFAZ real bloqueada.',
      'B-PEFA-11: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PEFA-12: Crypto/XML/PDF reais bloqueados.',
      'B-PEFA-13: Produção V2 e routeToV2 bloqueados.',
      'B-PEFA-14: Legado obrigatório preservado.',
      'B-PEFA-15: Tráfego real e promoção real de tráfego bloqueados.',
      'B-PEFA-16: Canary/cutover/go-live/rollout/rollback reais bloqueados.',
      'B-PEFA-17: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PEFA-18: Captura/duplicação/shadow/mirror reais bloqueados.',
      'B-PEFA-19: Notificações reais bloqueadas.',
      'B-PEFA-20: Bypass físico e drift executável real bloqueados.',
      'B-PEFA-21: Payload e dados sensíveis bloqueados.'
    ];
  }
}
