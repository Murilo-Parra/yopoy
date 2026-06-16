export class FiscalRealApprovalPersistenceBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-APG-01', description: 'Persistence gate não persiste approval record real.' },
      { id: 'B-APG-02', description: 'Schema real bloqueado.' },
      { id: 'B-APG-03', description: 'Migration real bloqueada.' },
      { id: 'B-APG-04', description: 'DDL real bloqueado.' },
      { id: 'B-APG-05', description: 'DML real bloqueado.' },
      { id: 'B-APG-06', description: 'COMMIT real bloqueado.' },
      { id: 'B-APG-07', description: 'Banco real desconectado.' },
      { id: 'B-APG-08', description: 'Assinatura real bloqueada.' },
      { id: 'B-APG-09', description: 'Autorização real bloqueada.' },
      { id: 'B-APG-10', description: 'Gate unlock real bloqueado.' },
      { id: 'B-APG-11', description: 'SEFAZ real bloqueada.' },
      { id: 'B-APG-12', description: 'Produção V2 bloqueada.' }
    ];
  }
}
