export class FiscalProductionGoLiveFinalApprovalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PGLFA-01: Aprovação real de go-live bloqueada.',
      'B-PGLFA-02: Aprovação real de cutover bloqueada.',
      'B-PGLFA-03: Executive sign-off real bloqueado.',
      'B-PGLFA-04: Assinatura real bloqueada.',
      'B-PGLFA-05: Gate real, autorização real e token real bloqueados.',
      'B-PGLFA-06: Produção V2 e routeToV2 bloqueados.',
      'B-PGLFA-07: Legado obrigatório preservado.',
      'B-PGLFA-08: Mutação real de tráfego bloqueada.',
      'B-PGLFA-09: Go-live/cutover/rollback/abort/fallback reais bloqueados.',
      'B-PGLFA-10: Release/rollout/canary/shutdown reais bloqueados.',
      'B-PGLFA-11: Load balancer e DNS reais bloqueados.',
      'B-PGLFA-12: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PGLFA-13: Captura de request/response/payload bloqueada.',
      'B-PGLFA-14: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PGLFA-15: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PGLFA-16: Banco real e DML/DDL bloqueados.',
      'B-PGLFA-17: SEFAZ real bloqueada.',
      'B-PGLFA-18: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PGLFA-19: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PGLFA-20: Escrita em filesystem e storage externo bloqueada.',
      'B-PGLFA-21: Incidente, ticket e remediação reais bloqueados.',
      'B-PGLFA-22: Notificações reais bloqueadas.',
      'B-PGLFA-23: Payload e dados sensíveis bloqueados.',
      'B-PGLFA-24: Namespace overlap com Domains 32/33/34/35/36/37.1/37.2/37.3 bloqueado.'
    ];
  }
}
