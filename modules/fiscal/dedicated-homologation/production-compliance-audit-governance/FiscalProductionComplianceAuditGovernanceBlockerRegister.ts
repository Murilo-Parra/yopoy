export class FiscalProductionComplianceAuditGovernanceBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCAG-01: Submissão regulatória real bloqueada.',
      'B-PCAG-02: Envio real a auditor externo bloqueado.',
      'B-PCAG-03: Dossiê real de auditoria bloqueado.',
      'B-PCAG-04: Arquivo real de auditoria bloqueado.',
      'B-PCAG-05: Exportação real de evidência bloqueada.',
      'B-PCAG-06: Leitura de payload real bloqueada.',
      'B-PCAG-07: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PCAG-08: Crypto real, hash real, assinatura XML e PDF real bloqueados.',
      'B-PCAG-09: Persistência real de audit record bloqueada.',
      'B-PCAG-10: Persistência real de compliance record bloqueada.',
      'B-PCAG-11: Persistência real de regulatory filing bloqueada.',
      'B-PCAG-12: Escrita em filesystem bloqueada.',
      'B-PCAG-13: Escrita em banco real bloqueada.',
      'B-PCAG-14: Upload para storage externo bloqueado.',
      'B-PCAG-15: SEFAZ real bloqueada.',
      'B-PCAG-16: Notificações reais bloqueadas.',
      'B-PCAG-17: Notificação real de auditor/regulador/stakeholder/aprovador/cliente bloqueada.',
      'B-PCAG-18: Gate real, autorização real e token real bloqueados.',
      'B-PCAG-19: Produção V2 e routeToV2 bloqueados.',
      'B-PCAG-20: Legado obrigatório preservado.',
      'B-PCAG-21: Tráfego real bloqueado.',
      'B-PCAG-22: Payload e dados sensíveis bloqueados.',
      'B-PCAG-23: Namespace overlap com Domains 32/33/34/35 bloqueado por naming específico.'
    ];
  }
}
