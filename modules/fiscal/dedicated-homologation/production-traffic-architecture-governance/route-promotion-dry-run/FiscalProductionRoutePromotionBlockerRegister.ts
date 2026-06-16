export class FiscalProductionRoutePromotionBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRP-01: Promoção real de rota bloqueada.',
      'B-PRP-02: Alteração real de percentual de tráfego bloqueada.',
      'B-PRP-03: Canary routing real bloqueado.',
      'B-PRP-04: Produção V2 e routeToV2 bloqueados.',
      'B-PRP-05: Legado obrigatório preservado.',
      'B-PRP-06: Mutação real de tráfego bloqueada.',
      'B-PRP-07: Load balancer e DNS reais bloqueados.',
      'B-PRP-08: Proxy, middleware e tap reais bloqueados.',
      'B-PRP-09: Mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PRP-10: Captura de request, response e payload bloqueada.',
      'B-PRP-11: Duplicação de request e espelhamento real bloqueados.',
      'B-PRP-12: Handler legado como side-effect bloqueado.',
      'B-PRP-13: Handler V2 operacional bloqueado.',
      'B-PRP-14: Gate, autorização e token reais bloqueados.',
      'B-PRP-15: Cutover, go-live, release, rollout e canary reais bloqueados.',
      'B-PRP-16: Rollback, abort, fallback e shutdown reais bloqueados.',
      'B-PRP-17: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PRP-18: Banco real, DML/DDL e SEFAZ bloqueados.',
      'B-PRP-19: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PRP-20: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PRP-21: Escrita em filesystem e storage externo bloqueada.',
      'B-PRP-22: Payload e dados sensíveis bloqueados.',
      'B-PRP-23: Namespace overlap com Domains 32/33/34/35/36/37/38/39.1/39.2/39.3 bloqueado.'
    ];
  }
}
