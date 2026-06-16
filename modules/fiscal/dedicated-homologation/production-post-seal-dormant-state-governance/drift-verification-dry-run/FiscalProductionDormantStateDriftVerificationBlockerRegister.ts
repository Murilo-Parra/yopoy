export class FiscalProductionDormantStateDriftVerificationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PDSDV-01: Scanner real de drift bloqueado.',
      'B-PDSDV-02: Detecção física real de authority drift bloqueada.',
      'B-PDSDV-03: Detecção física real de activation drift bloqueada.',
      'B-PDSDV-04: Detecção física real de routing drift bloqueada.',
      'B-PDSDV-05: Detecção física real de runtime drift bloqueada.',
      'B-PDSDV-06: Detecção física real de database drift bloqueada.',
      'B-PDSDV-07: Detecção física real de external integration drift bloqueada.',
      'B-PDSDV-08: Detecção física real de sensitive data drift bloqueada.',
      'B-PDSDV-09: Retomada real bloqueada.',
      'B-PDSDV-10: Reentrada real bloqueada.',
      'B-PDSDV-11: Produção V2 e routeToV2 bloqueados.',
      'B-PDSDV-12: Legado obrigatório preservado.',
      'B-PDSDV-13: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PDSDV-14: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PDSDV-15: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PDSDV-16: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PDSDV-17: SEFAZ, API externa, webhook e callback reais bloqueados.',
      'B-PDSDV-18: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PDSDV-19: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PDSDV-20: Crypto e assinatura XML reais bloqueadas.',
      'B-PDSDV-21: Filesystem, storage e banco escrito bloqueados.',
      'B-PDSDV-22: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PDSDV-23: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PDSDV-24: Namespace overlap introduzido pelo 46.3 bloqueado.'
    ];
  }
}
