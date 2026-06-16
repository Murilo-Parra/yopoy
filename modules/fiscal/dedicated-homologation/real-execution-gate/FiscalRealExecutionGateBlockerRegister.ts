export class FiscalRealExecutionGateBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-EG-01', description: 'Gate desbloqueio não permitido nesta fase.' },
      { id: 'B-EG-02', description: 'Autorização real ainda bloqueada.' },
      { id: 'B-EG-03', description: 'Abertura real de janela ainda bloqueada.' },
      { id: 'B-EG-04', description: 'Execução real ainda bloqueada.' },
      { id: 'B-EG-05', description: 'IaC apply real ainda bloqueado.' },
      { id: 'B-EG-06', description: 'Infraestrutura real ainda bloqueada.' },
      { id: 'B-EG-07', description: 'Banco dedicado real ainda bloqueado.' },
      { id: 'B-EG-08', description: 'Vault real ainda bloqueado.' },
      { id: 'B-EG-09', description: 'Escrita de secrets reais ainda bloqueada.' },
      { id: 'B-EG-10', description: 'Certificado A1 real ainda bloqueado.' },
      { id: 'B-EG-11', description: 'SEFAZ homologação real ainda bloqueada.' },
      { id: 'B-EG-12', description: 'XML signer real ainda bloqueado.' },
      { id: 'B-EG-13', description: 'DANFE/PDF real ainda bloqueado.' },
      { id: 'B-EG-14', description: 'Produção V2 ainda bloqueada.' }
    ];
  }
}
