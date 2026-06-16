export class FiscalRealProvisioningFinalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-RC-01', description: 'Autorização real não permitida nesta fase.' },
      { id: 'B-RC-02', description: 'Abertura real de janela ainda bloqueada.' },
      { id: 'B-RC-03', description: 'Execução real ainda bloqueada.' },
      { id: 'B-RC-04', description: 'IaC apply real ainda bloqueado.' },
      { id: 'B-RC-05', description: 'Infraestrutura real ainda bloqueada.' },
      { id: 'B-RC-06', description: 'Banco dedicado real ainda bloqueado.' },
      { id: 'B-RC-07', description: 'Vault real ainda bloqueado.' },
      { id: 'B-RC-08', description: 'Escrita de secrets reais ainda bloqueada.' },
      { id: 'B-RC-09', description: 'Certificado A1 real ainda bloqueado.' },
      { id: 'B-RC-10', description: 'SEFAZ homologação real ainda bloqueada.' },
      { id: 'B-RC-11', description: 'XML signer real ainda bloqueado.' },
      { id: 'B-RC-12', description: 'DANFE/PDF real ainda bloqueado.' },
      { id: 'B-RC-13', description: 'Produção V2 ainda bloqueada.' }
    ];
  }
}
