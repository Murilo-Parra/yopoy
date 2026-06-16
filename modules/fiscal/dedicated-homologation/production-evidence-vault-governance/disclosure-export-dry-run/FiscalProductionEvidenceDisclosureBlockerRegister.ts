export class FiscalProductionEvidenceDisclosureBlockerRegister {
  public static getBlockers() {
    return [
      'B-PED-01: Exportação real de evidência bloqueada.',
      'B-PED-02: Pacote real de auditoria bloqueado.',
      'B-PED-03: Arquivo real de disclosure bloqueado.',
      'B-PED-04: Upload para storage externo bloqueado.',
      'B-PED-05: Notificações reais bloqueadas.',
      'B-PED-06: Notificação real de auditor/stakeholder/aprovador/cliente bloqueada.',
      'B-PED-07: Leitura de payload real bloqueada.',
      'B-PED-08: Leitura de XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PED-09: Crypto real, hash real, assinatura XML e PDF real bloqueados.',
      'B-PED-10: Persistência real de evidência bloqueada.',
      'B-PED-11: Persistência real de disclosure record bloqueada.',
      'B-PED-12: Persistência real de audit record bloqueada.',
      'B-PED-13: Legal hold persistente bloqueado.',
      'B-PED-14: Escrita em filesystem bloqueada.',
      'B-PED-15: Escrita em banco real bloqueada.',
      'B-PED-16: SEFAZ real bloqueada.',
      'B-PED-17: Gate real, autorização real e token real bloqueados.',
      'B-PED-18: Produção V2 e routeToV2 bloqueados.',
      'B-PED-19: Legado obrigatório preservado.',
      'B-PED-20: Tráfego real bloqueado.',
      'B-PED-21: Payload e dados sensíveis bloqueados.',
      'B-PED-22: Namespace overlap com Domains 32/33/34/35.1/35.2/35.3 bloqueado por naming específico.'
    ];
  }
}
