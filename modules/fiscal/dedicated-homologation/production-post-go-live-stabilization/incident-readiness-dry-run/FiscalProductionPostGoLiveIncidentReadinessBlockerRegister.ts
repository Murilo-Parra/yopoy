export class FiscalProductionPostGoLiveIncidentReadinessBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PPGLIR-01: Abertura real de incidente bloqueada.',
      'B-PPGLIR-02: Criação real de ticket bloqueada.',
      'B-PPGLIR-03: Execução real de runbook bloqueada.',
      'B-PPGLIR-04: Mitigação e remediação reais bloqueadas.',
      'B-PPGLIR-05: Notificações reais para operador, SRE, cliente, stakeholder e aprovador bloqueadas.',
      'B-PPGLIR-06: Webhook, Slack, WhatsApp, e-mail, PagerDuty e Opsgenie reais bloqueados.',
      'B-PPGLIR-07: Alerta produtivo real bloqueado.',
      'B-PPGLIR-08: Observability real bloqueada.',
      'B-PPGLIR-09: Captura real de métricas, logs e traces bloqueada.',
      'B-PPGLIR-10: Observação real de produção bloqueada.',
      'B-PPGLIR-11: Go-live e cutover reais bloqueados.',
      'B-PPGLIR-12: Produção V2 e routeToV2 bloqueados.',
      'B-PPGLIR-13: Legado obrigatório preservado.',
      'B-PPGLIR-14: Mutação real de tráfego bloqueada.',
      'B-PPGLIR-15: Load balancer e DNS reais bloqueados.',
      'B-PPGLIR-16: Proxy, middleware, tap e shadow traffic reais bloqueados.',
      'B-PPGLIR-17: Captura de request/response/payload bloqueada.',
      'B-PPGLIR-18: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PPGLIR-19: Gate real, autorização real e token real bloqueados.',
      'B-PPGLIR-20: Rollback, abort, fallback, release, rollout, canary e shutdown reais bloqueados.',
      'B-PPGLIR-21: Runtime/queue/job/worker/shell reais bloqueados.',
      'B-PPGLIR-22: Banco real e DML/DDL bloqueados.',
      'B-PPGLIR-23: SEFAZ real bloqueada.',
      'B-PPGLIR-24: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PPGLIR-25: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PPGLIR-26: Escrita em filesystem e storage externo bloqueada.',
      'B-PPGLIR-27: Payload e dados sensíveis bloqueados.',
      'B-PPGLIR-28: Namespace overlap com Domains 32/33/34/35/36/37/38.1 bloqueado.'
    ];
  }
}
