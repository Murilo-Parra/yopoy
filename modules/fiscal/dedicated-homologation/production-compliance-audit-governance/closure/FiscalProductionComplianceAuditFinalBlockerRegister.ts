export class FiscalProductionComplianceAuditFinalBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PCAC-01: Closure operacional real bloqueado.',
      'B-PCAC-02: Submissão regulatória real bloqueada.',
      'B-PCAC-03: Pacote real para auditor externo bloqueado.',
      'B-PCAC-04: Dossiê real de auditoria bloqueado.',
      'B-PCAC-05: Protocolo regulatório real bloqueado.',
      'B-PCAC-06: Finding real bloqueado.',
      'B-PCAC-07: Remediação real bloqueada.',
      'B-PCAC-08: Release real bloqueado.',
      'B-PCAC-09: Rollback real bloqueado.',
      'B-PCAC-10: Shutdown real da V2 bloqueado.',
      'B-PCAC-11: Kill-switch real bloqueado.',
      'B-PCAC-12: Mutação de tráfego real bloqueada.',
      'B-PCAC-13: routeToV2 bloqueado.',
      'B-PCAC-14: Legado obrigatório preservado.',
      'B-PCAC-15: Gate real, autorização real e token real bloqueados.',
      'B-PCAC-16: Leitura de payload/XML/PDF/PFX/certificado/segredo/token bloqueada.',
      'B-PCAC-17: Crypto/hash/XML signing/PDF real bloqueados.',
      'B-PCAC-18: Escrita em filesystem, banco e storage externo bloqueada.',
      'B-PCAC-19: SEFAZ real bloqueada.',
      'B-PCAC-20: Notificações reais bloqueadas.',
      'B-PCAC-21: Payload e dados sensíveis bloqueados.',
      'B-PCAC-22: Namespace overlap com Domains 32/33/34/35/36.1/36.2/36.3/36.4/36.5 bloqueado.'
    ];
  }
}
