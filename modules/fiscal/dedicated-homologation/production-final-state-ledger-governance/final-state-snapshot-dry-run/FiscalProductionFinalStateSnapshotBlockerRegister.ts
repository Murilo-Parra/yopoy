export class FiscalProductionFinalStateSnapshotBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFSS-01: Snapshot real bloqueado.',
      'B-PFSS-02: Ledger entry real bloqueada.',
      'B-PFSS-03: Persistência real de snapshot bloqueada.',
      'B-PFSS-04: Persistência real de atestado bloqueada.',
      'B-PFSS-05: Prova legal real bloqueada.',
      'B-PFSS-06: Prova criptográfica real bloqueada.',
      'B-PFSS-07: Hash real bloqueado.',
      'B-PFSS-08: Assinatura real bloqueada.',
      'B-PFSS-09: Filesystem, storage e banco bloqueados.',
      'B-PFSS-10: Ledger real e registro real bloqueados.',
      'B-PFSS-11: Closure e handoff operacional reais bloqueados.',
      'B-PFSS-12: Aprovação e execução real de go-live bloqueadas.',
      'B-PFSS-13: Comando real de ativação bloqueado.',
      'B-PFSS-14: Autoridade real de ativação bloqueada.',
      'B-PFSS-15: Gate e token reais bloqueados.',
      'B-PFSS-16: Produção V2 e routeToV2 bloqueados.',
      'B-PFSS-17: Legado obrigatório preservado.',
      'B-PFSS-18: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFSS-19: Rollback, abort, fallback, shutdown e kill-switch reais bloqueados.',
      'B-PFSS-20: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFSS-21: Captura de request, response e payload bloqueada.',
      'B-PFSS-22: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFSS-23: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFSS-24: SEFAZ e API externa reais bloqueadas.',
      'B-PFSS-25: Webhook, callback e notification provider reais bloqueados.',
      'B-PFSS-26: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFSS-27: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFSS-28: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFSS-29: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFSS-30: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFSS-31: Namespace overlap introduzido pelo 42.2 bloqueado.'
    ];
  }
}
