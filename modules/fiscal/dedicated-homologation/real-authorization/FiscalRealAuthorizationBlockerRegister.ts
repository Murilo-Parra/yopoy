export class FiscalRealAuthorizationBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-RA-01', description: 'Intake não concede autorização real.' },
      { id: 'B-RA-02', description: 'Envelope não executável.' },
      { id: 'B-RA-03', description: 'Envelope não assinado.' },
      { id: 'B-RA-04', description: 'Envelope não persistido.' },
      { id: 'B-RA-05', description: 'Dual approval real não concluído.' },
      { id: 'B-RA-06', description: 'Gate unlock real bloqueado.' },
      { id: 'B-RA-07', description: 'Execução real bloqueada.' },
      { id: 'B-RA-08', description: 'IaC apply real bloqueado.' },
      { id: 'B-RA-09', description: 'Banco/vault/secret real bloqueado.' },
      { id: 'B-RA-10', description: 'Certificado real bloqueado.' },
      { id: 'B-RA-11', description: 'SEFAZ real bloqueada.' },
      { id: 'B-RA-12', description: 'XML/PDF real bloqueado.' },
      { id: 'B-RA-13', description: 'Produção V2 bloqueada.' }
    ];
  }
}
