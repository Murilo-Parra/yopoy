export class FiscalProductionExternalIntegrationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PEI-01: API externa real bloqueada.',
      'B-PEI-02: SEFAZ real bloqueada.',
      'B-PEI-03: Adapter HTTP real bloqueado.',
      'B-PEI-04: Callback real bloqueado.',
      'B-PEI-05: Webhook real bloqueado.',
      'B-PEI-06: Slack, WhatsApp, e-mail e pager reais bloqueados.',
      'B-PEI-07: Token real bloqueado.',
      'B-PEI-08: Autorização real bloqueada.',
      'B-PEI-09: Gate real bloqueado.',
      'B-PEI-10: API key, client secret, token e authorization header bloqueados.',
      'B-PEI-11: Certificado, PFX, senha e chave privada bloqueados.',
      'B-PEI-12: Crypto, assinatura XML e geração PDF reais bloqueadas.',
      'B-PEI-13: Payload fiscal, XML, PDF, tenant data e documento fiscal bloqueados.',
      'B-PEI-14: Banco real e DML/DDL bloqueados.',
      'B-PEI-15: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PEI-16: Produção V2 e routeToV2 bloqueados.',
      'B-PEI-17: Legado obrigatório preservado.',
      'B-PEI-18: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PEI-19: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PEI-20: Captura de request, response e payload bloqueada.',
      'B-PEI-21: Payload e dados sensíveis bloqueados.',
      'B-PEI-22: Namespace overlap com Domains 32/33/34/35/36/37/38/39/40.1/40.2/40.3/40.4 bloqueado.'
    ];
  }
}
