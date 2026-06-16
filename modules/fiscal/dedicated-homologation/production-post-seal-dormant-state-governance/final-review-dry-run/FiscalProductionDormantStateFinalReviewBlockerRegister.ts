export class FiscalProductionDormantStateFinalReviewBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PDSFR-01: Aprovação executiva real bloqueada.',
      'B-PDSFR-02: Ciência executiva real vinculante bloqueada.',
      'B-PDSFR-03: Assinatura real bloqueada.',
      'B-PDSFR-04: Ata real bloqueada.',
      'B-PDSFR-05: Efeito legal real bloqueado.',
      'B-PDSFR-06: Registro legal/operacional real bloqueado.',
      'B-PDSFR-07: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PDSFR-08: Exportação e envio real bloqueados.',
      'B-PDSFR-09: Notificação real bloqueada.',
      'B-PDSFR-10: Handoff real bloqueado.',
      'B-PDSFR-11: Retomada real de autoridade bloqueada.',
      'B-PDSFR-12: Retomada real de ativação bloqueada.',
      'B-PDSFR-13: Reentrada real bloqueada.',
      'B-PDSFR-14: Gate e token reais bloqueados.',
      'B-PDSFR-15: Produção V2 e routeToV2 bloqueados.',
      'B-PDSFR-16: Legado obrigatório preservado.',
      'B-PDSFR-17: Tráfego real bloqueado.',
      'B-PDSFR-18: Runtime real bloqueado.',
      'B-PDSFR-19: Banco, transação, DML, DDL e migration reais bloqueados.',
      'B-PDSFR-20: SEFAZ, API externa e webhook reais bloqueados.',
      'B-PDSFR-21: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PDSFR-22: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PDSFR-23: Crypto e assinatura XML reais bloqueadas.',
      'B-PDSFR-24: Filesystem, storage e banco escrito bloqueados.',
      'B-PDSFR-25: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PDSFR-26: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PDSFR-27: Namespace overlap introduzido pelo 46.4 bloqueado.'
    ];
  }
}
