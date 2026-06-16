export class FiscalRealExecutionPreparationFinalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-EPC-01', description: 'Preparation closure não aprova execução real.' },
      { id: 'B-EPC-02', description: 'Gate unlock real permanece bloqueado.' },
      { id: 'B-EPC-03', description: 'Autorização real permanece bloqueada.' },
      { id: 'B-EPC-04', description: 'IaC apply real permanece bloqueado.' },
      { id: 'B-EPC-05', description: 'Comando real permanece bloqueado.' },
      { id: 'B-EPC-06', description: 'Banco real permanece bloqueado.' },
      { id: 'B-EPC-07', description: 'Vault real permanece bloqueado.' },
      { id: 'B-EPC-08', description: 'Secret real permanece bloqueado.' },
      { id: 'B-EPC-09', description: 'Certificado real permanece bloqueado.' },
      { id: 'B-EPC-10', description: 'SEFAZ real permanece bloqueada.' },
      { id: 'B-EPC-11', description: 'XML/PDF real permanece bloqueado.' },
      { id: 'B-EPC-12', description: 'Produção V2 permanece bloqueada.' }
    ];
  }
}
