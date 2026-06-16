export class FiscalRealExecutionGateFinalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-EGC-01', description: 'Gate unlock real não permitido nesta fase.' },
      { id: 'B-EGC-02', description: 'Autorização real não permitida nesta fase.' },
      { id: 'B-EGC-03', description: 'Execução real ainda bloqueada.' },
      { id: 'B-EGC-04', description: 'IaC apply real ainda bloqueado.' },
      { id: 'B-EGC-05', description: 'Infraestrutura real ainda bloqueada.' },
      { id: 'B-EGC-06', description: 'Banco dedicado real ainda bloqueado.' },
      { id: 'B-EGC-07', description: 'Vault real ainda bloqueado.' },
      { id: 'B-EGC-08', description: 'Escrita de secrets reais ainda bloqueada.' },
      { id: 'B-EGC-09', description: 'Certificado A1 real ainda bloqueado.' },
      { id: 'B-EGC-10', description: 'SEFAZ homologação real ainda bloqueada.' },
      { id: 'B-EGC-11', description: 'XML signer real ainda bloqueado.' },
      { id: 'B-EGC-12', description: 'DANFE/PDF real ainda bloqueado.' },
      { id: 'B-EGC-13', description: 'Produção V2 ainda bloqueada.' }
    ];
  }
}
