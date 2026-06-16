export class FiscalRealChangeWindowBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-CW-01', description: 'Abertura real de janela não autorizada nesta fase.' },
      { id: 'B-CW-02', description: 'Execução real ainda bloqueada.' },
      { id: 'B-CW-03', description: 'IaC apply real ainda bloqueado.' },
      { id: 'B-CW-04', description: 'Provisionamento de infraestrutura real ainda bloqueado.' },
      { id: 'B-CW-05', description: 'Banco dedicado real ainda bloqueado.' },
      { id: 'B-CW-06', description: 'Vault real ainda bloqueado.' },
      { id: 'B-CW-07', description: 'Escrita de secrets reais ainda bloqueada.' },
      { id: 'B-CW-08', description: 'Certificado A1 real ainda bloqueado.' },
      { id: 'B-CW-09', description: 'SEFAZ homologação real ainda bloqueada.' },
      { id: 'B-CW-10', description: 'XML signer real ainda bloqueado.' },
      { id: 'B-CW-11', description: 'DANFE/PDF real ainda bloqueado.' },
      { id: 'B-CW-12', description: 'Produção V2 ainda bloqueada.' }
    ];
  }
}
