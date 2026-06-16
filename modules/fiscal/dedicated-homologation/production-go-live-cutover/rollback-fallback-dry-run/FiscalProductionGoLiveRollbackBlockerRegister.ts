export class FiscalProductionGoLiveRollbackBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PGLR-01: Rollback real bloqueado.',
      'B-PGLR-02: Abort real bloqueado.',
      'B-PGLR-03: Fallback real bloqueado.',
      'B-PGLR-04: Reversão e mutação real de tráfego bloqueadas.',
      'B-PGLR-05: Kill-switch e shutdown reais bloqueados.',
      'B-PGLR-06: Produção V2 e routeToV2 bloqueados.',
      'B-PGLR-07: Legado obrigatório preservado.',
      'B-PGLR-08: Load balancer e DNS reais bloqueados.',
      'B-PGLR-09: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PGLR-10: Captura de request/response/payload bloqueada.',
      'B-PGLR-11: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PGLR-12: Gate real, autorização real e token real bloqueados.',
      'B-PGLR-13: Deploy/release/rollout/canary reais bloqueados.',
      'B-PGLR-14: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PGLR-15: Banco real e DML/DDL bloqueados.',
      'B-PGLR-16: SEFAZ real bloqueada.',
      'B-PGLR-17: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PGLR-18: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PGLR-19: Escrita em filesystem e storage externo bloqueada.',
      'B-PGLR-20: Incidente, ticket e remediação reais bloqueados.',
      'B-PGLR-21: Notificações reais bloqueadas.',
      'B-PGLR-22: Payload e dados sensíveis bloqueados.',
      'B-PGLR-23: Namespace overlap com Domains 32/33/34/35/36/37.1/37.2 bloqueado.'
    ];
  }
}
