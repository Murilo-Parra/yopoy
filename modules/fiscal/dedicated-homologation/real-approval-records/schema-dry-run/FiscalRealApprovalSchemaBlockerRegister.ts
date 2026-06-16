export class FiscalRealApprovalSchemaBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-ASD-01', description: 'Schema dry-run não executa migration real.' },
      { id: 'B-ASD-02', description: 'DDL real bloqueado.' },
      { id: 'B-ASD-03', description: 'DML real bloqueado.' },
      { id: 'B-ASD-04', description: 'CREATE/ALTER/DROP TABLE real bloqueado.' },
      { id: 'B-ASD-05', description: 'CREATE INDEX real bloqueado.' },
      { id: 'B-ASD-06', description: 'RLS real não aplicado.' },
      { id: 'B-ASD-07', description: 'Banco real desconectado.' },
      { id: 'B-ASD-08', description: 'Approval record real não persistido.' },
      { id: 'B-ASD-09', description: 'Autorização real bloqueada.' },
      { id: 'B-ASD-10', description: 'Gate unlock real bloqueado.' },
      { id: 'B-ASD-11', description: 'SEFAZ real bloqueada.' },
      { id: 'B-ASD-12', description: 'Produção V2 bloqueada.' }
    ];
  }
}
