export class FiscalProductionExecutionCutoverDenialBlockerRegister {
  public static getBlockers() {
    return [
      'B-PECD-01: Cutover real bloqueado.',
      'B-PECD-02: Abort real bloqueado.',
      'B-PECD-03: Rollback real bloqueado.',
      'B-PECD-04: Kill-switch real bloqueado.',
      'B-PECD-05: Contenção real de runtime bloqueada.',
      'B-PECD-06: Firewall físico de execução não pode ser bypassado.',
      'B-PECD-07: Runtime/queue/job/worker reais bloqueados.',
      'B-PECD-08: Command runner/shell reais bloqueados.',
      'B-PECD-09: Banco real e transações reais bloqueados.',
      'B-PECD-10: DDL/DML reais bloqueados.',
      'B-PECD-11: SEFAZ real bloqueada.',
      'B-PECD-12: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PECD-13: Crypto/XML/PDF reais bloqueados.',
      'B-PECD-14: Gate real, autorização real e token real bloqueados.',
      'B-PECD-15: Produção V2 e routeToV2 bloqueados.',
      'B-PECD-16: Legado obrigatório preservado.',
      'B-PECD-17: Tráfego real e promoção real de tráfego bloqueados.',
      'B-PECD-18: Canary/go-live/rollout reais bloqueados.',
      'B-PECD-19: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PECD-20: Captura/duplicação/shadow/mirror reais bloqueados.',
      'B-PECD-21: Notificações reais bloqueadas.',
      'B-PECD-22: Payload e dados sensíveis bloqueados.'
    ];
  }
}
