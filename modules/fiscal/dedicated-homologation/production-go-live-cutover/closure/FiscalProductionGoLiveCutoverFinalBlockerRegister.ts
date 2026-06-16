export class FiscalProductionGoLiveCutoverFinalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PGLCC-01: Closure operacional real bloqueado.',
      'B-PGLCC-02: Go-live real bloqueado.',
      'B-PGLCC-03: Cutover real bloqueado.',
      'B-PGLCC-04: Handoff operacional real bloqueado.',
      'B-PGLCC-05: Gate real, autorização real e token real bloqueados.',
      'B-PGLCC-06: Produção V2 e routeToV2 bloqueados.',
      'B-PGLCC-07: Legado obrigatório preservado.',
      'B-PGLCC-08: Mutação real de tráfego bloqueada.',
      'B-PGLCC-09: Load balancer e DNS reais bloqueados.',
      'B-PGLCC-10: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PGLCC-11: Captura de request/response/payload bloqueada.',
      'B-PGLCC-12: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PGLCC-13: Rollback, abort e fallback reais bloqueados.',
      'B-PGLCC-14: Release, rollout, canary e shutdown reais bloqueados.',
      'B-PGLCC-15: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PGLCC-16: Banco real e DML/DDL bloqueados.',
      'B-PGLCC-17: SEFAZ real bloqueada.',
      'B-PGLCC-18: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PGLCC-19: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PGLCC-20: Escrita em filesystem e storage externo bloqueada.',
      'B-PGLCC-21: Incidente, ticket e remediação reais bloqueados.',
      'B-PGLCC-22: Notificações reais bloqueadas.',
      'B-PGLCC-23: Payload e dados sensíveis bloqueados.',
      'B-PGLCC-24: Namespace overlap com Domains 32/33/34/35/36/37.1/37.2/37.3/37.4 bloqueado.'
    ];
  }
}
