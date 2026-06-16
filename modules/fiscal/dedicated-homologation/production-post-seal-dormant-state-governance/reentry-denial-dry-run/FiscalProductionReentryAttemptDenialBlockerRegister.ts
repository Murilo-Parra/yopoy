export class FiscalProductionReentryAttemptDenialBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRAD-01: Tentativa real de reentrada bloqueada.',
      'B-PRAD-02: Desbloqueio real de retomada bloqueado.',
      'B-PRAD-03: Retomada real de autoridade bloqueada.',
      'B-PRAD-04: Retomada real de ativação bloqueada.',
      'B-PRAD-05: Retomada real de roteamento bloqueada.',
      'B-PRAD-06: Retomada real de runtime bloqueada.',
      'B-PRAD-07: Retomada real de banco bloqueada.',
      'B-PRAD-08: Retomada real de integração externa bloqueada.',
      'B-PRAD-09: Retomada real de dados sensíveis bloqueada.',
      'B-PRAD-10: Gate real bloqueado.',
      'B-PRAD-11: Token real bloqueado.',
      'B-PRAD-12: Caminho real de ativação bloqueado.',
      'B-PRAD-13: Caminho real para Produção V2 bloqueado.',
      'B-PRAD-14: Produção V2 e routeToV2 bloqueados.',
      'B-PRAD-15: Legado obrigatório preservado.',
      'B-PRAD-16: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PRAD-17: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PRAD-18: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PRAD-19: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PRAD-20: SEFAZ, API externa, webhook e callback reais bloqueados.',
      'B-PRAD-21: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PRAD-22: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PRAD-23: Crypto e assinatura XML reais bloqueadas.',
      'B-PRAD-24: Filesystem, storage e banco escrito bloqueados.',
      'B-PRAD-25: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PRAD-26: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PRAD-27: Namespace overlap introduzido pelo 46.2 bloqueado.'
    ];
  }
}
