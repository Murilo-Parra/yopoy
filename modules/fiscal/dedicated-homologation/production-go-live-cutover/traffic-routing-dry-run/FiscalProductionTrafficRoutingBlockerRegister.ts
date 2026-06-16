export class FiscalProductionTrafficRoutingBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PTR-01: Mutação real de tráfego bloqueada.',
      'B-PTR-02: routeToV2 e Produção V2 bloqueados.',
      'B-PTR-03: Legado obrigatório preservado.',
      'B-PTR-04: Cutover e go-live reais bloqueados.',
      'B-PTR-05: Load balancer real bloqueado.',
      'B-PTR-06: DNS real bloqueado.',
      'B-PTR-07: Proxy, middleware e tap reais bloqueados.',
      'B-PTR-08: Shadow traffic real bloqueado.',
      'B-PTR-09: Duplicação e captura de request/response/payload bloqueadas.',
      'B-PTR-10: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PTR-11: Gate real, autorização real e token real bloqueados.',
      'B-PTR-12: Deploy/release/rollout/canary reais bloqueados.',
      'B-PTR-13: Rollback e shutdown reais bloqueados.',
      'B-PTR-14: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PTR-15: Banco real e DML/DDL bloqueados.',
      'B-PTR-16: SEFAZ real bloqueada.',
      'B-PTR-17: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PTR-18: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PTR-19: Escrita em filesystem e storage externo bloqueada.',
      'B-PTR-20: Notificações reais bloqueadas.',
      'B-PTR-21: Payload e dados sensíveis bloqueados.',
      'B-PTR-22: Namespace overlap com Domains 32/33/34/35/36/37.1 bloqueado.'
    ];
  }
}
