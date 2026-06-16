export class FiscalRealApprovalDmlBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-ADM-01', description: 'DML dry-run não executa INSERT real.' },
      { id: 'B-ADM-02', description: 'UPDATE real bloqueado.' },
      { id: 'B-ADM-03', description: 'DELETE real bloqueado.' },
      { id: 'B-ADM-04', description: 'COMMIT real bloqueado.' },
      { id: 'B-ADM-05', description: 'Banco real desconectado.' },
      { id: 'B-ADM-06', description: 'Approval record real não persistido.' },
      { id: 'B-ADM-07', description: 'Assinatura real bloqueada.' },
      { id: 'B-ADM-08', description: 'Autorização real bloqueada.' },
      { id: 'B-ADM-09', description: 'Gate unlock real bloqueado.' },
      { id: 'B-ADM-10', description: 'SEFAZ real bloqueada.' },
      { id: 'B-ADM-11', description: 'XML/PDF real bloqueado.' },
      { id: 'B-ADM-12', description: 'Produção V2 bloqueada.' }
    ];
  }
}
