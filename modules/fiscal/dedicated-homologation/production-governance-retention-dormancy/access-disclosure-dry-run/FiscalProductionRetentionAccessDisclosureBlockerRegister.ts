export class FiscalProductionRetentionAccessDisclosureBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRAD-01: Acesso real bloqueado.',
      'B-PRAD-02: Retrieval real bloqueado.',
      'B-PRAD-03: Leitura real de archive bloqueada.',
      'B-PRAD-04: Leitura real de retention/custody/disclosure record bloqueada.',
      'B-PRAD-05: Aprovação real de disclosure bloqueada.',
      'B-PRAD-06: Pacote real de exportação bloqueado.',
      'B-PRAD-07: Link real de download e presigned URL bloqueados.',
      'B-PRAD-08: Envio real de pacote bloqueado.',
      'B-PRAD-09: Notificação real bloqueada.',
      'B-PRAD-10: Redaction real bloqueada.',
      'B-PRAD-11: Persistência real de audit/disclosure/export bloqueada.',
      'B-PRAD-12: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PRAD-13: Hash, assinatura e proof reais bloqueados.',
      'B-PRAD-14: Filesystem, storage e banco bloqueados.',
      'B-PRAD-15: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PRAD-16: Aprovação e execução real de go-live bloqueadas.',
      'B-PRAD-17: Autoridade real de ativação bloqueada.',
      'B-PRAD-18: Gate e token reais bloqueados.',
      'B-PRAD-19: Produção V2 e routeToV2 bloqueados.',
      'B-PRAD-20: Legado obrigatório preservado.',
      'B-PRAD-21: Tráfego real bloqueado.',
      'B-PRAD-22: Runtime, queue, job e worker reais bloqueados.',
      'B-PRAD-23: Banco, DML, DDL e migration reais bloqueados.',
      'B-PRAD-24: SEFAZ e API externa reais bloqueadas.',
      'B-PRAD-25: Webhook, callback e notification provider reais bloqueados.',
      'B-PRAD-26: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PRAD-27: Crypto e assinatura XML reais bloqueadas.',
      'B-PRAD-28: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PRAD-29: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PRAD-30: Namespace overlap introduzido pelo 44.4 bloqueado.'
    ];
  }
}
