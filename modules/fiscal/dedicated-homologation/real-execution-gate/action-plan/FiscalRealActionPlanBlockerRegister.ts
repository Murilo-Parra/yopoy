export class FiscalRealActionPlanBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-AP-01', description: 'Payload não executável nesta fase.' },
      { id: 'B-AP-02', description: 'Payload não assinado nesta fase.' },
      { id: 'B-AP-03', description: 'Payload bruto não persistido nesta fase.' },
      { id: 'B-AP-04', description: 'Gate unlock real bloqueado.' },
      { id: 'B-AP-05', description: 'Autorização real bloqueada.' },
      { id: 'B-AP-06', description: 'Terraform apply bloqueado.' },
      { id: 'B-AP-07', description: 'Pulumi up bloqueado.' },
      { id: 'B-AP-08', description: 'Banco real bloqueado.' },
      { id: 'B-AP-09', description: 'Vault real bloqueado.' },
      { id: 'B-AP-10', description: 'Certificado real bloqueado.' },
      { id: 'B-AP-11', description: 'SEFAZ real bloqueada.' },
      { id: 'B-AP-12', description: 'XML/PDF real bloqueado.' },
      { id: 'B-AP-13', description: 'Produção V2 bloqueada.' }
    ];
  }
}
