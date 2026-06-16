export class FiscalProductionFinalGoLiveCommandRollbackBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PFGCR-01: Rollback real por comando bloqueado.',
      'B-PFGCR-02: Abort real por comando bloqueado.',
      'B-PFGCR-03: Fallback real por comando bloqueado.',
      'B-PFGCR-04: Shutdown real e kill-switch real bloqueados.',
      'B-PFGCR-05: Reversão real de tráfego bloqueada.',
      'B-PFGCR-06: Aprovação real de go-live bloqueada.',
      'B-PFGCR-07: Execução real de go-live bloqueada.',
      'B-PFGCR-08: Comando real de ativação bloqueado.',
      'B-PFGCR-09: Executive sign-off real bloqueado.',
      'B-PFGCR-10: Assinatura real bloqueada.',
      'B-PFGCR-11: Autoridade real de ativação bloqueada.',
      'B-PFGCR-12: Gate e token reais bloqueados.',
      'B-PFGCR-13: Produção V2 e routeToV2 bloqueados.',
      'B-PFGCR-14: Legado obrigatório preservado.',
      'B-PFGCR-15: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PFGCR-16: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PFGCR-17: Captura de request, response e payload bloqueada.',
      'B-PFGCR-18: Runtime, queue, job, worker, scheduler, cron, shell e command runner reais bloqueados.',
      'B-PFGCR-19: Process manager e lifecycle runner reais bloqueados.',
      'B-PFGCR-20: Banco, pool, transação, query, DML, DDL e migration reais bloqueados.',
      'B-PFGCR-21: Repository write real bloqueado.',
      'B-PFGCR-22: SEFAZ e API externa reais bloqueadas.',
      'B-PFGCR-23: Webhook, callback e notification provider reais bloqueados.',
      'B-PFGCR-24: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PFGCR-25: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PFGCR-26: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PFGCR-27: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PFGCR-28: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PFGCR-29: Namespace overlap introduzido pelo 41.4 bloqueado.'
    ];
  }
}
