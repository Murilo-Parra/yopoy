export class FiscalRealApprovalRecordDryRunBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-ARD-01', description: 'Dry-run não persiste approval record real.' },
      { id: 'B-ARD-02', description: 'DDL real bloqueado.' },
      { id: 'B-ARD-03', description: 'DML real bloqueado.' },
      { id: 'B-ARD-04', description: 'COMMIT real bloqueado.' },
      { id: 'B-ARD-05', description: 'Assinatura real bloqueada.' },
      { id: 'B-ARD-06', description: 'Autorização real bloqueada.' },
      { id: 'B-ARD-07', description: 'Gate unlock real bloqueado.' },
      { id: 'B-ARD-08', description: 'SEFAZ real bloqueada.' },
      { id: 'B-ARD-09', description: 'XML/PDF real bloqueado.' },
      { id: 'B-ARD-10', description: 'Produção V2 bloqueada.' }
    ];
  }
}
