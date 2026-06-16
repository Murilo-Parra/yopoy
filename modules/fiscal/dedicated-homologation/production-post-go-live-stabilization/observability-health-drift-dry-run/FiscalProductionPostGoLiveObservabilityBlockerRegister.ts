export class FiscalProductionPostGoLiveObservabilityBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PPGLO-01: Instalação real de observability bloqueada.',
      'B-PPGLO-02: Conexão real com Prometheus/Grafana/Datadog/New Relic bloqueada.',
      'B-PPGLO-03: Captura real de métricas/logs/traces bloqueada.',
      'B-PPGLO-04: Leitura real de telemetria bloqueada.',
      'B-PPGLO-05: Dashboard real bloqueado.',
      'B-PPGLO-06: Alerta produtivo e alert rule real bloqueados.',
      'B-PPGLO-07: Avaliação SLO/SLA real-time bloqueada.',
      'B-PPGLO-08: Persistência real de métricas bloqueada.',
      'B-PPGLO-09: Incidente, ticket, runbook e remediação reais bloqueados.',
      'B-PPGLO-10: Notificações reais bloqueadas.',
      'B-PPGLO-11: Go-live e cutover reais bloqueados.',
      'B-PPGLO-12: Produção V2 e routeToV2 bloqueados.',
      'B-PPGLO-13: Legado obrigatório preservado.',
      'B-PPGLO-14: Mutação real de tráfego bloqueada.',
      'B-PPGLO-15: Load balancer e DNS reais bloqueados.',
      'B-PPGLO-16: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PPGLO-17: Captura de request/response/payload bloqueada.',
      'B-PPGLO-18: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PPGLO-19: Gate real, autorização real e token real bloqueados.',
      'B-PPGLO-20: Rollback, abort, fallback, release, rollout, canary e shutdown reais bloqueados.',
      'B-PPGLO-21: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PPGLO-22: Banco real e DML/DDL bloqueados.',
      'B-PPGLO-23: SEFAZ real bloqueada.',
      'B-PPGLO-24: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PPGLO-25: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PPGLO-26: Escrita em filesystem e storage externo bloqueada.',
      'B-PPGLO-27: Payload e dados sensíveis bloqueados.',
      'B-PPGLO-28: Namespace overlap com Domains 32/33/34/35/36/37/38.1/38.2 bloqueado.'
    ];
  }
}
