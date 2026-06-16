export class FiscalProductionGoLiveCutoverBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PGLC-01: Go-live real bloqueado.',
      'B-PGLC-02: Cutover real bloqueado.',
      'B-PGLC-03: Produção V2 e routeToV2 bloqueados.',
      'B-PGLC-04: Legado obrigatório preservado.',
      'B-PGLC-05: Mutação real de tráfego bloqueada.',
      'B-PGLC-06: Proxy/middleware/tap/shadow traffic reais bloqueados.',
      'B-PGLC-07: Gate real, autorização real e token real bloqueados.',
      'B-PGLC-08: Deploy/release/rollout/canary reais bloqueados.',
      'B-PGLC-09: Rollback e shutdown reais bloqueados.',
      'B-PGLC-10: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PGLC-11: Banco real e DML/DDL bloqueados.',
      'B-PGLC-12: SEFAZ real bloqueada.',
      'B-PGLC-13: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PGLC-14: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PGLC-15: Escrita em filesystem e storage externo bloqueada.',
      'B-PGLC-16: Notificações reais bloqueadas.',
      'B-PGLC-17: Payload e dados sensíveis bloqueados.',
      'B-PGLC-18: Namespace overlap com Domains 32/33/34/35/36 bloqueado.'
    ];
  }
}
