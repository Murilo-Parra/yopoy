export class FiscalProductionCrossDomainSealEvidenceBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PCDSE-01: Selo real bloqueado.',
      'B-PCDSE-02: Revalidação real de autoridade bloqueada.',
      'B-PCDSE-03: Conversão de evidência em autoridade operacional bloqueada.',
      'B-PCDSE-04: Registro legal/operacional real bloqueado.',
      'B-PCDSE-05: Hash, assinatura e proof reais bloqueados.',
      'B-PCDSE-06: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PCDSE-07: Exportação e envio real de pacote bloqueados.',
      'B-PCDSE-08: Notificação real bloqueada.',
      'B-PCDSE-09: Go-live real bloqueado.',
      'B-PCDSE-10: Cutover real bloqueado.',
      'B-PCDSE-11: Autoridade real de ativação bloqueada.',
      'B-PCDSE-12: Gate e token reais bloqueados.',
      'B-PCDSE-13: Produção V2 e routeToV2 bloqueados.',
      'B-PCDSE-14: Legado obrigatório preservado.',
      'B-PCDSE-15: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PCDSE-16: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PCDSE-17: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PCDSE-18: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PCDSE-19: SEFAZ, API externa, webhook e callback reais bloqueados.',
      'B-PCDSE-20: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PCDSE-21: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PCDSE-22: Crypto e assinatura XML reais bloqueadas.',
      'B-PCDSE-23: Filesystem, storage e banco escrito bloqueados.',
      'B-PCDSE-24: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PCDSE-25: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PCDSE-26: Namespace overlap introduzido pelo 45.2 bloqueado.'
    ];
  }
}
