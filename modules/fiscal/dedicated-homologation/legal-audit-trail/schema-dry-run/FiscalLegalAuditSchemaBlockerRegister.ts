export class FiscalLegalAuditSchemaBlockerRegister {
  public static getBlockers() {
    return [
      'B-LAS-01: Schema dry-run não cria ledger real.',
      'B-LAS-02: Migration real bloqueada.',
      'B-LAS-03: DDL real bloqueado.',
      'B-LAS-04: DML real bloqueado.',
      'B-LAS-05: CREATE/ALTER/DROP TABLE real bloqueado.',
      'B-LAS-06: CREATE INDEX real bloqueado.',
      'B-LAS-07: RLS real não aplicado.',
      'B-LAS-08: Retention policy real não aplicada.',
      'B-LAS-09: DELETE de retenção real bloqueado.',
      'B-LAS-10: Banco real desconectado.',
      'B-LAS-11: Trilha legal real não persistida.',
      'B-LAS-12: Autorização real bloqueada.',
      'B-LAS-13: SEFAZ real bloqueada.',
      'B-LAS-14: Produção V2 bloqueada.'
    ];
  }
}
