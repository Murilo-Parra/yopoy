export class FiscalProductionTrafficArchitectureBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PTAG-01: Mutação real de tráfego bloqueada.',
      'B-PTAG-02: Produção V2 e routeToV2 bloqueados.',
      'B-PTAG-03: Legado obrigatório preservado.',
      'B-PTAG-04: Load balancer real bloqueado.',
      'B-PTAG-05: DNS real bloqueado.',
      'B-PTAG-06: Proxy, middleware e tap reais bloqueados.',
      'B-PTAG-07: Mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PTAG-08: Captura de request, response e payload bloqueada.',
      'B-PTAG-09: Handler legado e handler V2 como side-effect bloqueados.',
      'B-PTAG-10: Gate real, autorização real e token real bloqueados.',
      'B-PTAG-11: Cutover, go-live, release, rollout e canary reais bloqueados.',
      'B-PTAG-12: Rollback, abort, fallback e shutdown reais bloqueados.',
      'B-PTAG-13: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PTAG-14: Banco real e DML/DDL bloqueados.',
      'B-PTAG-15: SEFAZ real bloqueada.',
      'B-PTAG-16: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PTAG-17: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PTAG-18: Escrita em filesystem e storage externo bloqueada.',
      'B-PTAG-19: Payload e dados sensíveis bloqueados.',
      'B-PTAG-20: Namespace overlap com Domains 32/33/34/35/36/37/38 bloqueado.'
    ];
  }
}
