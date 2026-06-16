export class FiscalProductionOperationsSignatureGovernanceBlockerRegister {
  public static getBlockers() {
    return [
      'B-POSG-01: Assinatura real bloqueada.',
      'B-POSG-02: Assinatura criptográfica real bloqueada.',
      'B-POSG-03: Consentimento real bloqueado.',
      'B-POSG-04: Persistência de registro real de assinatura bloqueada.',
      'B-POSG-05: Autorização real bloqueada.',
      'B-POSG-06: Gate real bloqueado.',
      'B-POSG-07: Operação produtiva real bloqueada.',
      'B-POSG-08: Handoff operacional real bloqueado.',
      'B-POSG-09: Produção V2 e routeToV2 bloqueados.',
      'B-POSG-10: Legado obrigatório preservado.',
      'B-POSG-11: Tráfego real inalterável.',
      'B-POSG-12: Certificado/PFX/senha/segredo/crypto reais bloqueados.',
      'B-POSG-13: XML/PDF reais bloqueados.',
      'B-POSG-14: Notificações reais bloqueadas.',
      'B-POSG-15: Banco/DDL/DML/SEFAZ reais bloqueados.',
      'B-POSG-16: Runtime/queue/job/worker reais bloqueados.'
    ];
  }
}
