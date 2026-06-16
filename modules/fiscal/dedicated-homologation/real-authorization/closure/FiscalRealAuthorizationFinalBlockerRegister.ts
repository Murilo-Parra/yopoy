export class FiscalRealAuthorizationFinalBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-RAC-01', description: 'Authorization closure não aprova autorização real.' },
      { id: 'B-RAC-02', description: 'Dual approval real permanece não concluído.' },
      { id: 'B-RAC-03', description: 'Gate unlock real permanece bloqueado.' },
      { id: 'B-RAC-04', description: 'Execução real permanece bloqueada.' },
      { id: 'B-RAC-05', description: 'IaC apply real permanece bloqueado.' },
      { id: 'B-RAC-06', description: 'Banco real permanece bloqueado.' },
      { id: 'B-RAC-07', description: 'Vault real permanece bloqueado.' },
      { id: 'B-RAC-08', description: 'Secret real permanece bloqueado.' },
      { id: 'B-RAC-09', description: 'Certificado real permanece bloqueado.' },
      { id: 'B-RAC-10', description: 'SEFAZ real permanece bloqueada.' },
      { id: 'B-RAC-11', description: 'XML/PDF real permanece bloqueado.' },
      { id: 'B-RAC-12', description: 'Produção V2 permanece bloqueada.' }
    ];
  }
}
