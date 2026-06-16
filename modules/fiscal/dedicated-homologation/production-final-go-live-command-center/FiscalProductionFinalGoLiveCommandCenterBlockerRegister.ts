export class FiscalProductionFinalGoLiveCommandCenterBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFGC-01: Aprovação real de go-live bloqueada.',
      'B-PFGC-02: Execução real de go-live bloqueada.',
      'B-PFGC-03: Handoff operacional real bloqueado.',
      'B-PFGC-04: Autoridade real de ativação bloqueada.',
      'B-PFGC-05: Gate e token reais bloqueados.',
      'B-PFGC-06: Produção V2 e routeToV2 bloqueados.',
      'B-PFGC-07: Legado obrigatório preservado.',
      'B-PFGC-08: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFGC-09: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFGC-10: Captura de request, response e payload bloqueada.',
      'B-PFGC-11: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFGC-12: Process manager e lifecycle runner reais bloqueados.',
      'B-PFGC-13: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFGC-14: Repository write real bloqueado.',
      'B-PFGC-15: SEFAZ e API externa reais bloqueadas.',
      'B-PFGC-16: Webhook, callback e notification provider reais bloqueados.',
      'B-PFGC-17: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFGC-18: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFGC-19: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFGC-20: Payload e dados sensíveis bloqueados.',
      'B-PFGC-21: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFGC-22: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFGC-23: Namespace overlap introduzido pelo 41.1 bloqueado.'
    ];
  }
}
