export class FiscalHomologationEnvironmentInventory {
  public static getEnvironments(): any[] {
    const baseFlags = {
      activeNow: false as false,
      realEndpointCalled: false as false,
      realCredentialLoaded: false as false,
      workerCreated: false as false,
      productionTrafficAttached: false as false
    };

    return [
      { id: 'homologation-api-v2-isolated', name: 'API V2 Isolated', ...baseFlags },
      { id: 'homologation-postgres-isolated', name: 'Postgres Isolated', ...baseFlags },
      { id: 'homologation-sefaz-mock', name: 'SEFAZ Mock', ...baseFlags },
      { id: 'homologation-certificate-vault-mock', name: 'Certificate Vault Mock', ...baseFlags },
      { id: 'homologation-xml-signer-mock', name: 'XML Signer Mock', ...baseFlags },
      { id: 'homologation-danfe-renderer-mock', name: 'DANFE Renderer Mock', ...baseFlags },
      { id: 'homologation-observability', name: 'Observability', ...baseFlags },
      { id: 'homologation-rollback-simulation', name: 'Rollback Simulation', ...baseFlags },
      { id: 'homologation-kill-switch-simulation', name: 'Kill Switch Simulation', ...baseFlags }
    ];
  }
}
