export class FiscalProductionSystemWideNonOperationalSealBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PSWNS-01: Selo real de produção bloqueado.',
      'B-PSWNS-02: Registro legal/operacional real bloqueado.',
      'B-PSWNS-03: Hash, assinatura e proof reais bloqueados.',
      'B-PSWNS-04: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PSWNS-05: Exportação e envio real de pacote bloqueados.',
      'B-PSWNS-06: Notificação real bloqueada.',
      'B-PSWNS-07: Go-live real bloqueado.',
      'B-PSWNS-08: Cutover real bloqueado.',
      'B-PSWNS-09: Autoridade real de ativação bloqueada.',
      'B-PSWNS-10: Gate e token reais bloqueados.',
      'B-PSWNS-11: Produção V2 e routeToV2 bloqueados.',
      'B-PSWNS-12: Legado obrigatório preservado.',
      'B-PSWNS-13: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PSWNS-14: Proxy, middleware, tap, mirror, sniffer e shadow traffic reais bloqueados.',
      'B-PSWNS-15: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PSWNS-16: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PSWNS-17: SEFAZ, API externa, webhook e callback reais bloqueados.',
      'B-PSWNS-18: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PSWNS-19: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PSWNS-20: Crypto e assinatura XML reais bloqueadas.',
      'B-PSWNS-21: Filesystem, storage e banco escrito bloqueados.',
      'B-PSWNS-22: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PSWNS-23: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PSWNS-24: Namespace overlap introduzido pelo 45.1 bloqueado.'
    ];
  }
}
