export class FiscalProductionPostGoLiveStabilizationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PPGLS-01: Observação real de produção bloqueada.',
      'B-PPGLS-02: Captura real de métricas/logs/traces bloqueada.',
      'B-PPGLS-03: Observability/dashboard/alerta reais bloqueados.',
      'B-PPGLS-04: Incidente, ticket, runbook e remediação reais bloqueados.',
      'B-PPGLS-05: Go-live e cutover reais bloqueados.',
      'B-PPGLS-06: Produção V2 e routeToV2 bloqueados.',
      'B-PPGLS-07: Legado obrigatório preservado.',
      'B-PPGLS-08: Mutação real de tráfego bloqueada.',
      'B-PPGLS-09: Load balancer e DNS reais bloqueados.',
      'B-PPGLS-10: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PPGLS-11: Captura de request/response/payload bloqueada.',
      'B-PPGLS-12: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PPGLS-13: Gate real, autorização real e token real bloqueados.',
      'B-PPGLS-14: Rollback, abort, fallback, release, rollout, canary e shutdown reais bloqueados.',
      'B-PPGLS-15: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PPGLS-16: Banco real e DML/DDL bloqueados.',
      'B-PPGLS-17: SEFAZ real bloqueada.',
      'B-PPGLS-18: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PPGLS-19: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PPGLS-20: Escrita em filesystem e storage externo bloqueada.',
      'B-PPGLS-21: Notificações reais bloqueadas.',
      'B-PPGLS-22: Payload e dados sensíveis bloqueados.',
      'B-PPGLS-23: Namespace overlap com Domains 32/33/34/35/36/37 bloqueado.'
    ];
  }
}
