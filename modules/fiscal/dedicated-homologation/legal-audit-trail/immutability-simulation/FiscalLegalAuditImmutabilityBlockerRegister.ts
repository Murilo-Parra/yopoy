export class FiscalLegalAuditImmutabilityBlockerRegister {
  public static getBlockers() {
    return [
      'B-LAI-01: Hash legal definitivo bloqueado.',
      'B-LAI-02: Assinatura real da trilha legal bloqueada.',
      'B-LAI-03: Certificado real bloqueado.',
      'B-LAI-04: PFX real bloqueado.',
      'B-LAI-05: Senha de certificado bloqueada.',
      'B-LAI-06: Endpoint externo real bloqueado.',
      'B-LAI-07: Persistência real da trilha legal bloqueada.',
      'B-LAI-08: DML/DDL real bloqueado.',
      'B-LAI-09: Banco real desconectado.',
      'B-LAI-10: Autorização real bloqueada.',
      'B-LAI-11: Gate unlock real bloqueado.',
      'B-LAI-12: SEFAZ real bloqueada.',
      'B-LAI-13: XML/PDF real bloqueado.',
      'B-LAI-14: Produção V2 bloqueada.'
    ];
  }
}
