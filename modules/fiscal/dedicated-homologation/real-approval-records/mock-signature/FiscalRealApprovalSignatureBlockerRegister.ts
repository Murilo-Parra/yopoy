export class FiscalRealApprovalSignatureBlockerRegister {
  public static getBlockers() {
    return [
      'B-AMS-01: Assinatura real bloqueada.',
      'B-AMS-02: Certificado real bloqueado.',
      'B-AMS-03: PFX real bloqueado.',
      'B-AMS-04: Senha de certificado bloqueada.',
      'B-AMS-05: Endpoint externo real bloqueado.',
      'B-AMS-06: Notificação externa real bloqueada.',
      'B-AMS-07: Autorização real bloqueada.',
      'B-AMS-08: DML real bloqueado.',
      'B-AMS-09: SEFAZ real bloqueada.',
      'B-AMS-10: XML/PDF real bloqueado.',
      'B-AMS-11: Produção V2 bloqueada.'
    ];
  }
}
