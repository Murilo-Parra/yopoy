export class FiscalRealApprovalRecordFinalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-ARC-01', description: 'Closure não cria approval record real.' },
      { id: 'B-ARC-02', description: 'Persistência real permanece bloqueada.' },
      { id: 'B-ARC-03', description: 'Assinatura real permanece bloqueada.' },
      { id: 'B-ARC-04', description: 'DDL real permanece bloqueado.' },
      { id: 'B-ARC-05', description: 'DML real permanece bloqueado.' },
      { id: 'B-ARC-06', description: 'COMMIT real permanece bloqueado.' },
      { id: 'B-ARC-07', description: 'Banco real permanece desconectado.' },
      { id: 'B-ARC-08', description: 'Autorização real permanece bloqueada.' },
      { id: 'B-ARC-09', description: 'Gate unlock real permanece bloqueado.' },
      { id: 'B-ARC-10', description: 'SEFAZ real permanece bloqueada.' },
      { id: 'B-ARC-11', description: 'XML/PDF real permanece bloqueado.' },
      { id: 'B-ARC-12', description: 'Produção V2 permanece bloqueada.' }
    ];
  }
}
