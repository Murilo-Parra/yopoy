export class FiscalProductionFinalStateDisclosureBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFSD-01: Disclosure real bloqueado.',
      'B-PFSD-02: Pacote real de disclosure bloqueado.',
      'B-PFSD-03: Exportação real de arquivo bloqueada.',
      'B-PFSD-04: Submissão real para auditor/regulador bloqueada.',
      'B-PFSD-05: Notificação real de auditor/stakeholder/cliente/regulador bloqueada.',
      'B-PFSD-06: ZIP/PDF/JSON/CSV reais bloqueados.',
      'B-PFSD-07: Persistência real de disclosure e handoff bloqueada.',
      'B-PFSD-08: Hash, assinatura e proof reais bloqueados.',
      'B-PFSD-09: Filesystem, storage e banco bloqueados.',
      'B-PFSD-10: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFSD-11: Integridade real e reconciliação real bloqueadas.',
      'B-PFSD-12: Snapshot, ledger entry, ledger e registro real bloqueados.',
      'B-PFSD-13: Closure e handoff operacional reais bloqueados.',
      'B-PFSD-14: Aprovação e execução real de go-live bloqueadas.',
      'B-PFSD-15: Comando real de ativação bloqueado.',
      'B-PFSD-16: Autoridade real de ativação bloqueada.',
      'B-PFSD-17: Gate e token reais bloqueados.',
      'B-PFSD-18: Produção V2 e routeToV2 bloqueados.',
      'B-PFSD-19: Legado obrigatório preservado.',
      'B-PFSD-20: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFSD-21: Rollback, abort, fallback, shutdown e kill-switch reais bloqueados.',
      'B-PFSD-22: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFSD-23: Captura de request, response e payload bloqueada.',
      'B-PFSD-24: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFSD-25: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFSD-26: SEFAZ e API externa reais bloqueadas.',
      'B-PFSD-27: Webhook, callback e notification provider reais bloqueados.',
      'B-PFSD-28: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFSD-29: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFSD-30: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFSD-31: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFSD-32: Namespace overlap introduzido pelo 42.4 bloqueado.'
    ];
  }
}
