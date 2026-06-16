export class FiscalProductionRuntimeOrchestrationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PROG-01: Runtime real bloqueado.',
      'B-PROG-02: Queue real bloqueada.',
      'B-PROG-03: Job real bloqueado.',
      'B-PROG-04: Worker real bloqueado.',
      'B-PROG-05: Scheduler real bloqueado.',
      'B-PROG-06: Cron real bloqueado.',
      'B-PROG-07: Shell command real bloqueado.',
      'B-PROG-08: Command runner real bloqueado.',
      'B-PROG-09: Process manager e lifecycle runner reais bloqueados.',
      'B-PROG-10: Transação real, commit e rollback bloqueados.',
      'B-PROG-11: Banco real e DML/DDL bloqueados.',
      'B-PROG-12: SEFAZ real bloqueada.',
      'B-PROG-13: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PROG-14: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PROG-15: Filesystem e storage externo bloqueados.',
      'B-PROG-16: Webhook, Slack, WhatsApp, e-mail e pager reais bloqueados.',
      'B-PROG-17: Gate, autorização e token reais bloqueados.',
      'B-PROG-18: Produção V2 e routeToV2 bloqueados.',
      'B-PROG-19: Legado obrigatório preservado.',
      'B-PROG-20: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PROG-21: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PROG-22: Captura de request, response e payload bloqueada.',
      'B-PROG-23: Payload e dados sensíveis bloqueados.',
      'B-PROG-24: Namespace overlap com Domains 32/33/34/35/36/37/38/39 bloqueado.'
    ];
  }
}
