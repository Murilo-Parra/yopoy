export class FiscalRealCommandManifestBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-CM-01', description: 'Comando real não permitido nesta fase.' },
      { id: 'B-CM-02', description: 'Comando executável não permitido nesta fase.' },
      { id: 'B-CM-03', description: 'Shell command não permitido nesta fase.' },
      { id: 'B-CM-04', description: 'Manifest assinado bloqueado.' },
      { id: 'B-CM-05', description: 'Manifest persistido bloqueado.' },
      { id: 'B-CM-06', description: 'Execução real bloqueada.' },
      { id: 'B-CM-07', description: 'IaC apply real bloqueado.' },
      { id: 'B-CM-08', description: 'Banco real bloqueado.' },
      { id: 'B-CM-09', description: 'Vault real bloqueado.' },
      { id: 'B-CM-10', description: 'Certificado real bloqueado.' },
      { id: 'B-CM-11', description: 'SEFAZ real bloqueada.' },
      { id: 'B-CM-12', description: 'XML/PDF real bloqueado.' },
      { id: 'B-CM-13', description: 'Produção V2 bloqueada.' }
    ];
  }
}
