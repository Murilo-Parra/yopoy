export class FiscalRealSecurityBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-RS-01', description: 'Aprovação real não autorizada nesta fase.' },
      { id: 'B-RS-02', description: 'IaC apply real ainda bloqueado.' },
      { id: 'B-RS-03', description: 'Provisionamento de infraestrutura real ainda bloqueado.' },
      { id: 'B-RS-04', description: 'Banco dedicado real ainda bloqueado.' },
      { id: 'B-RS-05', description: 'Vault real ainda bloqueado.' },
      { id: 'B-RS-06', description: 'Escrita de secrets reais ainda bloqueada.' },
      { id: 'B-RS-07', description: 'Certificado A1 real ainda bloqueado.' },
      { id: 'B-RS-08', description: 'SEFAZ homologação real ainda bloqueada.' },
      { id: 'B-RS-09', description: 'XML signer real ainda bloqueado.' },
      { id: 'B-RS-10', description: 'DANFE/PDF real ainda bloqueado.' },
      { id: 'B-RS-11', description: 'Produção V2 ainda bloqueada.' },
      { id: 'B-RS-12', description: 'Aprovação jurídica/fiscal externa ainda pendente.' }
    ];
  }
}
