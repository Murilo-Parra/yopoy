export class FiscalRealApprovalRecordBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-AR-01', description: 'Blueprint não cria approval record real.' },
      { id: 'B-AR-02', description: 'Approval record real não persistido.' },
      { id: 'B-AR-03', description: 'Approval record real não assinado.' },
      { id: 'B-AR-04', description: 'Envelope de assinatura não executável.' },
      { id: 'B-AR-05', description: 'Autorização real não concedida.' },
      { id: 'B-AR-06', description: 'Dual approval real não concluído.' },
      { id: 'B-AR-07', description: 'Gate unlock real bloqueado.' },
      { id: 'B-AR-08', description: 'Execução real bloqueada.' },
      { id: 'B-AR-09', description: 'IaC apply real bloqueado.' },
      { id: 'B-AR-10', description: 'Banco/vault/secret real bloqueado.' },
      { id: 'B-AR-11', description: 'Certificado real bloqueado.' },
      { id: 'B-AR-12', description: 'SEFAZ real bloqueada.' },
      { id: 'B-AR-13', description: 'XML/PDF real bloqueado.' },
      { id: 'B-AR-14', description: 'Produção V2 bloqueada.' }
    ];
  }
}
