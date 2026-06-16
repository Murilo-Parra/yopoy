export class FiscalProductionRegulatoryFilingBlockerRegister {
  public static getBlockers() {
    return [
      'B-PRF-01: Filing regulatório real bloqueado.',
      'B-PRF-02: Payload real de submissão bloqueado.',
      'B-PRF-03: Protocolo regulatório real bloqueado.',
      'B-PRF-04: Arquivo real de filing bloqueado.',
      'B-PRF-05: Anexos XML/PDF/PFX/certificado reais bloqueados.',
      'B-PRF-06: Leitura de payload real bloqueada.',
      'B-PRF-07: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PRF-08: Crypto real, hash real, assinatura XML e PDF real bloqueados.',
      'B-PRF-09: Persistência real de filing record bloqueada.',
      'B-PRF-10: Persistência real de protocol record bloqueada.',
      'B-PRF-11: Persistência real de audit record bloqueada.',
      'B-PRF-12: Escrita em filesystem bloqueada.',
      'B-PRF-13: Escrita em banco real bloqueada.',
      'B-PRF-14: Upload para storage externo bloqueado.',
      'B-PRF-15: SEFAZ real bloqueada.',
      'B-PRF-16: Notificações reais bloqueadas.',
      'B-PRF-17: Notificação real de auditor/regulador/stakeholder/aprovador/cliente bloqueada.',
      'B-PRF-18: Gate real, autorização real e token real bloqueados.',
      'B-PRF-19: Produção V2 e routeToV2 bloqueados.',
      'B-PRF-20: Legado obrigatório preservado.',
      'B-PRF-21: Tráfego real bloqueado.',
      'B-PRF-22: Payload e dados sensíveis bloqueados.',
      'B-PRF-23: Namespace overlap com Domains 32/33/34/35/36.1 bloqueado por naming específico.'
    ];
  }
}
