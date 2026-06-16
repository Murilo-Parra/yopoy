export class FiscalRealUnlockBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-UG-01', description: 'Destravamento real do gate não permitido nesta fase.' },
      { id: 'B-UG-02', description: 'Bypass de dupla aprovação bloqueado.' },
      { id: 'B-UG-03', description: 'Autorização real de execução bloqueada.' },
      { id: 'B-UG-04', description: 'Abertura real de janela bloqueada.' },
      { id: 'B-UG-05', description: 'Execução real bloqueada.' },
      { id: 'B-UG-06', description: 'IaC apply real bloqueado.' },
      { id: 'B-UG-07', description: 'Banco real bloqueado.' },
      { id: 'B-UG-08', description: 'Vault real bloqueado.' },
      { id: 'B-UG-09', description: 'Certificado real bloqueado.' },
      { id: 'B-UG-10', description: 'SEFAZ real bloqueada.' },
      { id: 'B-UG-11', description: 'XML/PDF real bloqueado.' },
      { id: 'B-UG-12', description: 'Produção V2 bloqueada.' }
    ];
  }
}
