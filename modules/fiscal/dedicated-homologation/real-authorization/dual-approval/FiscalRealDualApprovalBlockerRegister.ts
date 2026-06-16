export class FiscalRealDualApprovalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-DA-01', description: 'Simulação não conclui dual approval real.' },
      { id: 'B-DA-02', description: 'Autorização real não concedida.' },
      { id: 'B-DA-03', description: 'Auto-aprovação bloqueada.' },
      { id: 'B-DA-04', description: 'Mesmo usuário nos dois approvals bloqueado.' },
      { id: 'B-DA-05', description: 'Gate unlock real bloqueado.' },
      { id: 'B-DA-06', description: 'Execução real bloqueada.' },
      { id: 'B-DA-07', description: 'IaC apply real bloqueado.' },
      { id: 'B-DA-08', description: 'Banco/vault/secret real bloqueado.' },
      { id: 'B-DA-09', description: 'Certificado real bloqueado.' },
      { id: 'B-DA-10', description: 'SEFAZ real bloqueada.' },
      { id: 'B-DA-11', description: 'XML/PDF real bloqueado.' },
      { id: 'B-DA-12', description: 'Produção V2 bloqueada.' }
    ];
  }
}
