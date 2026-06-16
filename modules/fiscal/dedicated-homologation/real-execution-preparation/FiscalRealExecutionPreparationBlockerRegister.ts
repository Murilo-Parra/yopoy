export class FiscalRealExecutionPreparationBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-EP-01', description: 'Execução real não permitida nesta fase.' },
      { id: 'B-EP-02', description: 'Gate unlock real bloqueado.' },
      { id: 'B-EP-03', description: 'Autorização real bloqueada.' },
      { id: 'B-EP-04', description: 'IaC apply real bloqueado.' },
      { id: 'B-EP-05', description: 'Banco real bloqueado.' },
      { id: 'B-EP-06', description: 'Vault real bloqueado.' },
      { id: 'B-EP-07', description: 'Certificado real bloqueado.' },
      { id: 'B-EP-08', description: 'SEFAZ real bloqueada.' },
      { id: 'B-EP-09', description: 'XML/PDF real bloqueado.' },
      { id: 'B-EP-10', description: 'Produção V2 bloqueada.' }
    ];
  }
}
