export class FiscalProductionPostGoLiveRemediationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PPGLR-01: War room real e sala real de crise bloqueadas.',
      'B-PPGLR-02: Incidente real e ticket real bloqueados.',
      'B-PPGLR-03: Remediação, mitigação e runbook reais bloqueados.',
      'B-PPGLR-04: Acesso real de suporte bloqueado.',
      'B-PPGLR-05: Alteração real de RBAC bloqueada.',
      'B-PPGLR-06: Sessão assistida real bloqueada.',
      'B-PPGLR-07: Handover operacional real bloqueado.',
      'B-PPGLR-08: Decisão real de estabilização e autorização real bloqueadas.',
      'B-PPGLR-09: Notificações reais bloqueadas.',
      'B-PPGLR-10: Alerta produtivo real bloqueado.',
      'B-PPGLR-11: Observability real bloqueada.',
      'B-PPGLR-12: Captura real de métricas/logs/traces bloqueada.',
      'B-PPGLR-13: Telemetria real bloqueada.',
      'B-PPGLR-14: Go-live e cutover reais bloqueados.',
      'B-PPGLR-15: Produção V2 e routeToV2 bloqueados.',
      'B-PPGLR-16: Legado obrigatório preservado.',
      'B-PPGLR-17: Mutação real de tráfego bloqueada.',
      'B-PPGLR-18: Load balancer e DNS reais bloqueados.',
      'B-PPGLR-19: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PPGLR-20: Captura de request/response/payload bloqueada.',
      'B-PPGLR-21: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PPGLR-22: Gate real, autorização real e token real bloqueados.',
      'B-PPGLR-23: Rollback, abort, fallback, release, rollout, canary e shutdown reais bloqueados.',
      'B-PPGLR-24: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PPGLR-25: Banco real e DML/DDL bloqueados.',
      'B-PPGLR-26: SEFAZ real bloqueada.',
      'B-PPGLR-27: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PPGLR-28: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PPGLR-29: Escrita em filesystem e storage externo bloqueada.',
      'B-PPGLR-30: Payload e dados sensíveis bloqueados.',
      'B-PPGLR-31: Namespace overlap com Domains 32/33/34/35/36/37/38.1/38.2/38.3 bloqueado.'
    ];
  }
}
