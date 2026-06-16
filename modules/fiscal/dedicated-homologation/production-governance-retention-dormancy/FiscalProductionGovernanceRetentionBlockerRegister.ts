export class FiscalProductionGovernanceRetentionBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PGRT-01: Retenção real bloqueada.',
      'B-PGRT-02: Custódia real bloqueada.',
      'B-PGRT-03: Mutação real de lifecycle bloqueada.',
      'B-PGRT-04: Legal hold real bloqueado.',
      'B-PGRT-05: Expiração e deleção reais bloqueadas.',
      'B-PGRT-06: Movimentação e compactação real de archive bloqueadas.',
      'B-PGRT-07: Registro real de retenção/custódia bloqueado.',
      'B-PGRT-08: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PGRT-09: Persistência real de retenção/custódia/lifecycle bloqueada.',
      'B-PGRT-10: Exportação real bloqueada.',
      'B-PGRT-11: Notificação real bloqueada.',
      'B-PGRT-12: Hash, assinatura e proof reais bloqueados.',
      'B-PGRT-13: Filesystem, storage e banco bloqueados.',
      'B-PGRT-14: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PGRT-15: Aprovação e execução real de go-live bloqueadas.',
      'B-PGRT-16: Autoridade real de ativação bloqueada.',
      'B-PGRT-17: Gate e token reais bloqueados.',
      'B-PGRT-18: Produção V2 e routeToV2 bloqueados.',
      'B-PGRT-19: Legado obrigatório preservado.',
      'B-PGRT-20: Tráfego real bloqueado.',
      'B-PGRT-21: Runtime, queue, job e worker reais bloqueados.',
      'B-PGRT-22: Banco, DML, DDL e migration reais bloqueados.',
      'B-PGRT-23: SEFAZ e API externa reais bloqueadas.',
      'B-PGRT-24: Webhook, callback e notification provider reais bloqueados.',
      'B-PGRT-25: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PGRT-26: Crypto e assinatura XML reais bloqueadas.',
      'B-PGRT-27: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PGRT-28: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PGRT-29: Namespace overlap introduzido pelo 44.1 bloqueado.'
    ];
  }
}
