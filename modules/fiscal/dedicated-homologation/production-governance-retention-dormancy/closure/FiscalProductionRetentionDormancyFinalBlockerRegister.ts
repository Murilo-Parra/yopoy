export class FiscalProductionRetentionDormancyFinalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRDC-01: Closure operacional real bloqueado.',
      'B-PRDC-02: Handoff operacional real bloqueado.',
      'B-PRDC-03: Retenção real bloqueada.',
      'B-PRDC-04: Custódia real bloqueada.',
      'B-PRDC-05: Atestado real de retenção/custódia bloqueado.',
      'B-PRDC-06: Legal hold real bloqueado.',
      'B-PRDC-07: Expiração e deleção reais bloqueadas.',
      'B-PRDC-08: Mutação real de lifecycle bloqueada.',
      'B-PRDC-09: Aplicação real de política de retenção bloqueada.',
      'B-PRDC-10: Transição real de archive bloqueada.',
      'B-PRDC-11: Acesso e retrieval reais bloqueados.',
      'B-PRDC-12: Disclosure e export reais bloqueados.',
      'B-PRDC-13: Download link e presigned URL reais bloqueados.',
      'B-PRDC-14: Notificação real bloqueada.',
      'B-PRDC-15: Persistência real de registros bloqueada.',
      'B-PRDC-16: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PRDC-17: Hash, assinatura e proof reais bloqueados.',
      'B-PRDC-18: Filesystem, storage e banco bloqueados.',
      'B-PRDC-19: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PRDC-20: Aprovação e execução real de go-live bloqueadas.',
      'B-PRDC-21: Autoridade real de ativação bloqueada.',
      'B-PRDC-22: Gate e token reais bloqueados.',
      'B-PRDC-23: Produção V2 e routeToV2 bloqueados.',
      'B-PRDC-24: Legado obrigatório preservado.',
      'B-PRDC-25: Tráfego real bloqueado.',
      'B-PRDC-26: Runtime, queue, job e worker reais bloqueados.',
      'B-PRDC-27: Banco, DML, DDL e migration reais bloqueados.',
      'B-PRDC-28: SEFAZ e API externa reais bloqueadas.',
      'B-PRDC-29: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PRDC-30: Crypto e assinatura XML reais bloqueadas.',
      'B-PRDC-31: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PRDC-32: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PRDC-33: Namespace overlap introduzido pelo 44.5 bloqueado.'
    ];
  }
}
