export class FiscalProductionComplianceReleaseGatekeeperBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCRG-01: Aprovação real de release bloqueada.',
      'B-PCRG-02: Regulatory gate unlock real bloqueado.',
      'B-PCRG-03: Gate real, autorização real e token real bloqueados.',
      'B-PCRG-04: Filing real e protocolo real bloqueados.',
      'B-PCRG-05: Finding real bloqueado.',
      'B-PCRG-06: Finding clearance persistente bloqueado.',
      'B-PCRG-07: Remediação real bloqueada.',
      'B-PCRG-08: Ticket e incidente reais bloqueados.',
      'B-PCRG-09: Notificações reais bloqueadas.',
      'B-PCRG-10: Leitura de payload real bloqueada.',
      'B-PCRG-11: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PCRG-12: Crypto real, hash real, assinatura XML e PDF real bloqueados.',
      'B-PCRG-13: Escrita em filesystem bloqueada.',
      'B-PCRG-14: Escrita em banco real bloqueada.',
      'B-PCRG-15: Upload para storage externo bloqueado.',
      'B-PCRG-16: SEFAZ real bloqueada.',
      'B-PCRG-17: Produção V2 e routeToV2 bloqueados.',
      'B-PCRG-18: Legado obrigatório preservado.',
      'B-PCRG-19: Tráfego real bloqueado.',
      'B-PCRG-20: Payload e dados sensíveis bloqueados.',
      'B-PCRG-21: Namespace overlap com Domains 32/33/34/35/36.1/36.2/36.3 bloqueado por naming específico.'
    ];
  }
}
