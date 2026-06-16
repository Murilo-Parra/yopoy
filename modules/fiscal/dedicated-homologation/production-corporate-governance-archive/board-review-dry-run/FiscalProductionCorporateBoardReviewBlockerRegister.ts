export class FiscalProductionCorporateBoardReviewBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PCBR-01: Revisão real de conselho bloqueada.',
      'B-PCBR-02: Acknowledgement executivo real bloqueado.',
      'B-PCBR-03: Aprovação real de board bloqueada.',
      'B-PCBR-04: Ata e registro real de reunião bloqueados.',
      'B-PCBR-05: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PCBR-06: Persistência real de board/acknowledgement bloqueada.',
      'B-PCBR-07: Exportação real bloqueada.',
      'B-PCBR-08: Notificação real bloqueada.',
      'B-PCBR-09: Hash, assinatura e proof reais bloqueados.',
      'B-PCBR-10: Filesystem, storage e banco bloqueados.',
      'B-PCBR-11: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PCBR-12: Aprovação e execução real de go-live bloqueadas.',
      'B-PCBR-13: Autoridade real de ativação bloqueada.',
      'B-PCBR-14: Gate e token reais bloqueados.',
      'B-PCBR-15: Produção V2 e routeToV2 bloqueados.',
      'B-PCBR-16: Legado obrigatório preservado.',
      'B-PCBR-17: Tráfego real bloqueado.',
      'B-PCBR-18: Runtime, queue, job e worker reais bloqueados.',
      'B-PCBR-19: Banco, DML, DDL e migration reais bloqueados.',
      'B-PCBR-20: SEFAZ e API externa reais bloqueadas.',
      'B-PCBR-21: Webhook, callback e notification provider reais bloqueados.',
      'B-PCBR-22: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PCBR-23: Crypto e assinatura XML reais bloqueadas.',
      'B-PCBR-24: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PCBR-25: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PCBR-26: Namespace overlap introduzido pelo 43.2 bloqueado.'
    ];
  }
}
