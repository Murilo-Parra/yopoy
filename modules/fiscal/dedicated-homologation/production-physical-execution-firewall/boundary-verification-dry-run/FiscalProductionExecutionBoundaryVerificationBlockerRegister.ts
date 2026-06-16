export class FiscalProductionExecutionBoundaryVerificationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEBV-01: Scanner real de infraestrutura bloqueado.',
      'B-PEBV-02: Runtime probe real bloqueado.',
      'B-PEBV-03: Queue/job/worker/scheduler/cron probe real bloqueado.',
      'B-PEBV-04: Command runner/shell real bloqueado.',
      'B-PEBV-05: Banco real e transações reais bloqueados.',
      'B-PEBV-06: DDL/DML reais bloqueados.',
      'B-PEBV-07: SEFAZ real bloqueada.',
      'B-PEBV-08: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-PEBV-09: Crypto/XML/PDF reais bloqueados.',
      'B-PEBV-10: Gate real, autorização real e token real bloqueados.',
      'B-PEBV-11: Produção V2 e routeToV2 bloqueados.',
      'B-PEBV-12: Legado obrigatório preservado.',
      'B-PEBV-13: Tráfego real e promoção real de tráfego bloqueados.',
      'B-PEBV-14: Canary/cutover/go-live/rollout/rollback reais bloqueados.',
      'B-PEBV-15: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PEBV-16: Captura/duplicação/shadow/mirror reais bloqueados.',
      'B-PEBV-17: Notificações reais bloqueadas.',
      'B-PEBV-18: Bypass físico e drift executável real bloqueados.',
      'B-PEBV-19: Payload e dados sensíveis bloqueados.'
    ];
  }
}
