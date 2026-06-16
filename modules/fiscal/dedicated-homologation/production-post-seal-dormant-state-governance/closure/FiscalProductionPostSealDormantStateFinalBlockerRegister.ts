export class FiscalProductionPostSealDormantStateFinalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PDSC-01: Closure operacional real bloqueado.',
      'B-PDSC-02: Handoff operacional real bloqueado.',
      'B-PDSC-03: Reentrada real bloqueada.',
      'B-PDSC-04: Retomada real bloqueada.',
      'B-PDSC-05: Retomada real de autoridade bloqueada.',
      'B-PDSC-06: Retomada real de ativação bloqueada.',
      'B-PDSC-07: Aprovação executiva, assinatura e efeito legal reais bloqueados.',
      'B-PDSC-08: Gate e token reais bloqueados.',
      'B-PDSC-09: Produção V2 e routeToV2 bloqueados.',
      'B-PDSC-10: Legado obrigatório preservado.',
      'B-PDSC-11: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PDSC-12: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PDSC-13: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PDSC-14: SEFAZ, API externa, webhook e notificação reais bloqueados.',
      'B-PDSC-15: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PDSC-16: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PDSC-17: Crypto, hash, proof e assinatura XML reais bloqueados.',
      'B-PDSC-18: Filesystem, storage e banco escrito bloqueados.',
      'B-PDSC-19: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PDSC-20: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PDSC-21: Namespace overlap introduzido pelo 46.5 bloqueado.'
    ];
  }
}
