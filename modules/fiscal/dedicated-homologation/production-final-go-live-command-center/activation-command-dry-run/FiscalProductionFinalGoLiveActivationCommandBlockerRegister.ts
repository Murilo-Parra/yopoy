export class FiscalProductionFinalGoLiveActivationCommandBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFGAC-01: Comando real de ativação bloqueado.',
      'B-PFGAC-02: Aprovação real de go-live bloqueada.',
      'B-PFGAC-03: Execução real de go-live bloqueada.',
      'B-PFGAC-04: Conversão de decisão não vinculante em vinculante bloqueada.',
      'B-PFGAC-05: Executive sign-off real bloqueado.',
      'B-PFGAC-06: Assinatura real bloqueada.',
      'B-PFGAC-07: Autoridade real de ativação bloqueada.',
      'B-PFGAC-08: Gate e token reais bloqueados.',
      'B-PFGAC-09: Produção V2 e routeToV2 bloqueados.',
      'B-PFGAC-10: Legado obrigatório preservado.',
      'B-PFGAC-11: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFGAC-12: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFGAC-13: Captura de request, response e payload bloqueada.',
      'B-PFGAC-14: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFGAC-15: Process manager e lifecycle runner reais bloqueados.',
      'B-PFGAC-16: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFGAC-17: Repository write real bloqueado.',
      'B-PFGAC-18: SEFAZ e API externa reais bloqueadas.',
      'B-PFGAC-19: Webhook, callback e notification provider reais bloqueados.',
      'B-PFGAC-20: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFGAC-21: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFGAC-22: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFGAC-23: Payload e dados sensíveis bloqueados.',
      'B-PFGAC-24: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFGAC-25: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFGAC-26: Namespace overlap introduzido pelo 41.3 bloqueado.'
    ];
  }
}
