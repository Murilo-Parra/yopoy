export class FiscalProductionProxyShadowBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PPSH-01: Proxy real bloqueado.',
      'B-PPSH-02: Middleware real bloqueado.',
      'B-PPSH-03: Tap real bloqueado.',
      'B-PPSH-04: Mirror real bloqueado.',
      'B-PPSH-05: Sniffer real bloqueado.',
      'B-PPSH-06: Shadow traffic real bloqueado.',
      'B-PPSH-07: Captura de request real bloqueada.',
      'B-PPSH-08: Captura de response real bloqueada.',
      'B-PPSH-09: Captura de payload real bloqueada.',
      'B-PPSH-10: Duplicação de request e espelhamento real bloqueados.',
      'B-PPSH-11: Handler legado como side-effect bloqueado.',
      'B-PPSH-12: Handler V2 operacional bloqueado.',
      'B-PPSH-13: Produção V2 e routeToV2 bloqueados.',
      'B-PPSH-14: Legado obrigatório preservado.',
      'B-PPSH-15: Mutação real de tráfego bloqueada.',
      'B-PPSH-16: Load balancer e DNS reais bloqueados.',
      'B-PPSH-17: Gate, autorização e token reais bloqueados.',
      'B-PPSH-18: Cutover, go-live, release, rollout e canary reais bloqueados.',
      'B-PPSH-19: Rollback, abort, fallback e shutdown reais bloqueados.',
      'B-PPSH-20: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PPSH-21: Banco real, DML/DDL e SEFAZ bloqueados.',
      'B-PPSH-22: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PPSH-23: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PPSH-24: Escrita em filesystem e storage externo bloqueada.',
      'B-PPSH-25: Payload e dados sensíveis bloqueados.',
      'B-PPSH-26: Namespace overlap com Domains 32/33/34/35/36/37/38/39.1/39.2 bloqueado.'
    ];
  }
}
