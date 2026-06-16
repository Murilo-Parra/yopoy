export class FiscalProductionComplianceFindingBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCF-01: Finding real bloqueado.',
      'B-PCF-02: Persistência real de finding record bloqueada.',
      'B-PCF-03: Ticket real bloqueado.',
      'B-PCF-04: Incidente real bloqueado.',
      'B-PCF-05: Remediação real bloqueada.',
      'B-PCF-06: Owner assignment real bloqueado.',
      'B-PCF-07: Notificações reais bloqueadas.',
      'B-PCF-08: Waiver e exception persistentes bloqueados.',
      'B-PCF-09: Leitura de payload real bloqueada.',
      'B-PCF-10: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PCF-11: Crypto real, hash real, assinatura XML e PDF real bloqueados.',
      'B-PCF-12: Escrita em filesystem bloqueada.',
      'B-PCF-13: Escrita em banco real bloqueada.',
      'B-PCF-14: Upload para storage externo bloqueado.',
      'B-PCF-15: SEFAZ real bloqueada.',
      'B-PCF-16: Gate real, autorização real e token real bloqueados.',
      'B-PCF-17: Produção V2 e routeToV2 bloqueados.',
      'B-PCF-18: Legado obrigatório preservado.',
      'B-PCF-19: Tráfego real bloqueado.',
      'B-PCF-20: Payload e dados sensíveis bloqueados.',
      'B-PCF-21: Namespace overlap com Domains 32/33/34/35/36.1/36.2 bloqueado por naming específico.'
    ];
  }
}
