export class FiscalProductionFinalGoLiveReadinessBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFGR-01: Aprovação real de go-live bloqueada.',
      'B-PFGR-02: Execução real de go-live bloqueada.',
      'B-PFGR-03: Executive sign-off real bloqueado.',
      'B-PFGR-04: Assinatura real bloqueada.',
      'B-PFGR-05: Autoridade real de ativação bloqueada.',
      'B-PFGR-06: Gate e token reais bloqueados.',
      'B-PFGR-07: Produção V2 e routeToV2 bloqueados.',
      'B-PFGR-08: Legado obrigatório preservado.',
      'B-PFGR-09: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFGR-10: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFGR-11: Captura de request, response e payload bloqueada.',
      'B-PFGR-12: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFGR-13: Process manager e lifecycle runner reais bloqueados.',
      'B-PFGR-14: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFGR-15: Repository write real bloqueado.',
      'B-PFGR-16: SEFAZ e API externa reais bloqueadas.',
      'B-PFGR-17: Webhook, callback e notification provider reais bloqueados.',
      'B-PFGR-18: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFGR-19: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFGR-20: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFGR-21: Payload e dados sensíveis bloqueados.',
      'B-PFGR-22: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFGR-23: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFGR-24: Namespace overlap introduzido pelo 41.2 bloqueado.'
    ];
  }
}
