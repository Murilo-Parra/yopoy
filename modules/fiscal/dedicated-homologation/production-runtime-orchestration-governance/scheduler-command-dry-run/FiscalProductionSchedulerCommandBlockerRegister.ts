export class FiscalProductionSchedulerCommandBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PSC-01: Scheduler real bloqueado.',
      'B-PSC-02: Cron real bloqueado.',
      'B-PSC-03: Shell command real bloqueado.',
      'B-PSC-04: Command runner real bloqueado.',
      'B-PSC-05: Process manager real bloqueado.',
      'B-PSC-06: Lifecycle runner real bloqueado.',
      'B-PSC-07: Task runner real bloqueado.',
      'B-PSC-08: Job scheduling real bloqueado.',
      'B-PSC-09: Recurring task real bloqueada.',
      'B-PSC-10: Timeout guard real bloqueado.',
      'B-PSC-11: Lifecycle hook real bloqueado.',
      'B-PSC-12: Runtime, queue, job e worker reais bloqueados.',
      'B-PSC-13: Batch e micro-batch reais bloqueados.',
      'B-PSC-14: Transação real, commit e rollback bloqueados.',
      'B-PSC-15: Banco real e DML/DDL bloqueados.',
      'B-PSC-16: SEFAZ real bloqueada.',
      'B-PSC-17: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PSC-18: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PSC-19: Filesystem e storage externo bloqueados.',
      'B-PSC-20: Webhook, Slack, WhatsApp, e-mail e pager reais bloqueados.',
      'B-PSC-21: Gate, autorização e token reais bloqueados.',
      'B-PSC-22: Produção V2 e routeToV2 bloqueados.',
      'B-PSC-23: Legado obrigatório preservado.',
      'B-PSC-24: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PSC-25: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PSC-26: Captura de request, response e payload bloqueada.',
      'B-PSC-27: Payload e dados sensíveis bloqueados.',
      'B-PSC-28: Namespace overlap com Domains 32/33/34/35/36/37/38/39/40.1/40.2 bloqueado.'
    ];
  }
}
