export class FiscalRealPreflightBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-PF-01', description: 'Preflight review não aprova execução real.' },
      { id: 'B-PF-02', description: 'Gate unlock real bloqueado.' },
      { id: 'B-PF-03', description: 'Autorização real bloqueada.' },
      { id: 'B-PF-04', description: 'IaC apply real bloqueado.' },
      { id: 'B-PF-05', description: 'Comando real bloqueado.' },
      { id: 'B-PF-06', description: 'Banco real bloqueado.' },
      { id: 'B-PF-07', description: 'Vault real bloqueado.' },
      { id: 'B-PF-08', description: 'Certificado real bloqueado.' },
      { id: 'B-PF-09', description: 'SEFAZ real bloqueada.' },
      { id: 'B-PF-10', description: 'XML/PDF real bloqueado.' },
      { id: 'B-PF-11', description: 'Produção V2 bloqueada.' }
    ];
  }
}
