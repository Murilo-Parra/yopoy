export class FiscalLegalAuditEventBlockerRegister {
  public static getBlockers() {
    return [
      'B-LAE-01: Persistência real de evento bloqueada.',
      'B-LAE-02: Persistência real de trilha legal bloqueada.',
      'B-LAE-03: INSERT real bloqueado.',
      'B-LAE-04: UPDATE real bloqueado.',
      'B-LAE-05: DELETE real bloqueado.',
      'B-LAE-06: COMMIT real bloqueado.',
      'B-LAE-07: Banco real desconectado.',
      'B-LAE-08: Approval record real não persistido.',
      'B-LAE-09: Autorização real bloqueada.',
      'B-LAE-10: Dual approval real bloqueado.',
      'B-LAE-11: Gate unlock real bloqueado.',
      'B-LAE-12: Endpoint externo real bloqueado.',
      'B-LAE-13: SEFAZ real bloqueada.',
      'B-LAE-14: Produção V2 bloqueada.'
    ];
  }
}
