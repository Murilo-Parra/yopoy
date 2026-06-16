export class FiscalProductionFinalStateLedgerBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFSL-01: Ledger real bloqueado.',
      'B-PFSL-02: Persistência real de registro bloqueada.',
      'B-PFSL-03: Registro legal real de ativação bloqueado.',
      'B-PFSL-04: Hash real bloqueado.',
      'B-PFSL-05: Assinatura real bloqueada.',
      'B-PFSL-06: Filesystem, storage e banco bloqueados.',
      'B-PFSL-07: Closure e handoff operacional reais bloqueados.',
      'B-PFSL-08: Aprovação e execução real de go-live bloqueadas.',
      'B-PFSL-09: Comando real de ativação bloqueado.',
      'B-PFSL-10: Autoridade real de ativação bloqueada.',
      'B-PFSL-11: Gate e token reais bloqueados.',
      'B-PFSL-12: Produção V2 e routeToV2 bloqueados.',
      'B-PFSL-13: Legado obrigatório preservado.',
      'B-PFSL-14: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFSL-15: Rollback, abort, fallback, shutdown e kill-switch reais bloqueados.',
      'B-PFSL-16: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFSL-17: Captura de request, response e payload bloqueada.',
      'B-PFSL-18: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFSL-19: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFSL-20: SEFAZ e API externa reais bloqueadas.',
      'B-PFSL-21: Webhook, callback e notification provider reais bloqueados.',
      'B-PFSL-22: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFSL-23: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFSL-24: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFSL-25: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFSL-26: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFSL-27: Namespace overlap introduzido pelo 42.1 bloqueado.'
    ];
  }
}
