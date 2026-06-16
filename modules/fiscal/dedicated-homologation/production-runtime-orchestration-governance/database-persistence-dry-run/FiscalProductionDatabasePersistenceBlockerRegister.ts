export class FiscalProductionDatabasePersistenceBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PDBP-01: Conexão real de banco bloqueada.',
      'B-PDBP-02: Connection pool real bloqueado.',
      'B-PDBP-03: Transação real bloqueada.',
      'B-PDBP-04: Commit e rollback reais bloqueados.',
      'B-PDBP-05: Query real e query runner real bloqueados.',
      'B-PDBP-06: DML real bloqueado.',
      'B-PDBP-07: DDL real bloqueado.',
      'B-PDBP-08: Migration real bloqueada.',
      'B-PDBP-09: Schema e table mutation reais bloqueados.',
      'B-PDBP-10: Repository write real bloqueado.',
      'B-PDBP-11: Persistence adapter real bloqueado.',
      'B-PDBP-12: DATABASE_URL, connection string e senha de banco bloqueadas.',
      'B-PDBP-13: Dados reais de tenant bloqueados.',
      'B-PDBP-14: Documento fiscal, XML, PDF, PFX e certificado reais bloqueados.',
      'B-PDBP-15: SEFAZ real bloqueada.',
      'B-PDBP-16: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PDBP-17: Webhook, Slack, WhatsApp, e-mail e pager reais bloqueados.',
      'B-PDBP-18: Gate, autorização e token reais bloqueados.',
      'B-PDBP-19: Produção V2 e routeToV2 bloqueados.',
      'B-PDBP-20: Legado obrigatório preservado.',
      'B-PDBP-21: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PDBP-22: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PDBP-23: Captura de request, response e payload bloqueada.',
      'B-PDBP-24: Payload e dados sensíveis bloqueados.',
      'B-PDBP-25: Namespace overlap com Domains 32/33/34/35/36/37/38/39/40.1/40.2/40.3 bloqueado.'
    ];
  }
}
