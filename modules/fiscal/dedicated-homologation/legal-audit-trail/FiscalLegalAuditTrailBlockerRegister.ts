export class FiscalLegalAuditTrailBlockerRegister {
  public static getBlockers() {
    return [
      'B-LAT-01: Ledger real bloqueado.',
      'B-LAT-02: Persistência real de trilha legal bloqueada.',
      'B-LAT-03: Approval record real não persistido.',
      'B-LAT-04: Assinatura real bloqueada.',
      'B-LAT-05: DDL/DML real bloqueado.',
      'B-LAT-06: COMMIT real bloqueado.',
      'B-LAT-07: Banco real desconectado.',
      'B-LAT-08: Autorização real bloqueada.',
      'B-LAT-09: Dual approval real bloqueado.',
      'B-LAT-10: Gate unlock real bloqueado.',
      'B-LAT-11: Endpoint externo real bloqueado.',
      'B-LAT-12: SEFAZ real bloqueada.',
      'B-LAT-13: XML/PDF real bloqueado.',
      'B-LAT-14: Produção V2 bloqueada.'
    ];
  }
}
