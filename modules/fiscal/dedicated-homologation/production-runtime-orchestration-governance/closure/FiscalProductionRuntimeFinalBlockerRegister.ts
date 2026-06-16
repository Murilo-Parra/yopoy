export class FiscalProductionRuntimeFinalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PROC-01: Closure operacional real bloqueado.',
      'B-PROC-02: Handoff operacional real bloqueado.',
      'B-PROC-03: Autorização, gate e token reais bloqueados.',
      'B-PROC-04: Publicação de pacote e artefato executável bloqueados.',
      'B-PROC-05: Runtime real bloqueado.',
      'B-PROC-06: Queue, job e worker reais bloqueados.',
      'B-PROC-07: Scheduler, cron, shell e command runner reais bloqueados.',
      'B-PROC-08: Process manager e lifecycle runner reais bloqueados.',
      'B-PROC-09: Banco real, pool e transação reais bloqueados.',
      'B-PROC-10: Query, DML, DDL, migration e repository write reais bloqueados.',
      'B-PROC-11: Tenant data e documento fiscal reais bloqueados.',
      'B-PROC-12: SEFAZ real bloqueada.',
      'B-PROC-13: API externa, webhook, callback e notification provider reais bloqueados.',
      'B-PROC-14: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PROC-15: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PROC-16: Payload, XML, PDF, request e response reais bloqueados.',
      'B-PROC-17: Produção V2 e routeToV2 bloqueados.',
      'B-PROC-18: Legado obrigatório preservado.',
      'B-PROC-19: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PROC-20: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PROC-21: Captura de request, response e payload bloqueada.',
      'B-PROC-22: Payload e dados sensíveis bloqueados.',
      'B-PROC-23: Lint global com ESLint v9 flat config documentado como pendência.',
      'B-PROC-24: TS2308/namespace overlap preexistente documentado.',
      'B-PROC-25: Namespace overlap introduzido pelo 40.6 bloqueado.'
    ];
  }
}
