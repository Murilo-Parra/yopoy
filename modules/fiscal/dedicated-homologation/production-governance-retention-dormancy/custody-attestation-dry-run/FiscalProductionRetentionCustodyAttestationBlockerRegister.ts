export class FiscalProductionRetentionCustodyAttestationBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRCA-01: Atestado real de custódia bloqueado.',
      'B-PRCA-02: Atestado real de retenção bloqueado.',
      'B-PRCA-03: Legal hold real bloqueado.',
      'B-PRCA-04: Expiração real bloqueada.',
      'B-PRCA-05: Deleção real bloqueada.',
      'B-PRCA-06: Movimentação, compactação e reclassificação real bloqueadas.',
      'B-PRCA-07: Cadeia real de custódia bloqueada.',
      'B-PRCA-08: Persistência real de retenção/custódia/legal hold/deleção bloqueada.',
      'B-PRCA-09: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PRCA-10: Exportação real bloqueada.',
      'B-PRCA-11: Notificação real bloqueada.',
      'B-PRCA-12: Hash, assinatura e proof reais bloqueados.',
      'B-PRCA-13: Filesystem, storage e banco bloqueados.',
      'B-PRCA-14: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PRCA-15: Aprovação e execução real de go-live bloqueadas.',
      'B-PRCA-16: Autoridade real de ativação bloqueada.',
      'B-PRCA-17: Gate e token reais bloqueados.',
      'B-PRCA-18: Produção V2 e routeToV2 bloqueados.',
      'B-PRCA-19: Legado obrigatório preservado.',
      'B-PRCA-20: Tráfego real bloqueado.',
      'B-PRCA-21: Runtime, queue, job e worker reais bloqueados.',
      'B-PRCA-22: Banco, DML, DDL e migration reais bloqueados.',
      'B-PRCA-23: SEFAZ e API externa reais bloqueadas.',
      'B-PRCA-24: Webhook, callback e notification provider reais bloqueados.',
      'B-PRCA-25: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PRCA-26: Crypto e assinatura XML reais bloqueadas.',
      'B-PRCA-27: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PRCA-28: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PRCA-29: Namespace overlap introduzido pelo 44.2 bloqueado.'
    ];
  }
}
