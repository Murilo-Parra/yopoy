import { FiscalDedicatedHomologationDomain } from './FiscalDedicatedHomologationTypes';

export class FiscalDedicatedEnvironmentInventory {
  public static getInventory() {
    const baseFlags = {
      planned: true as true,
      activeNow: false as false,
      realEndpointCalled: false as false,
      realCredentialLoaded: false as false,
      workerCreated: false as false,
      productionTrafficAttached: false as false,
      trafficChanged: false as false
    };

    return [
      { component: 'isolated-runtime', domain: FiscalDedicatedHomologationDomain.NETWORK, ...baseFlags },
      { component: 'isolated-postgres', domain: FiscalDedicatedHomologationDomain.DATABASE, ...baseFlags },
      { component: 'isolated-secret-vault', domain: FiscalDedicatedHomologationDomain.SECRET_VAULT, ...baseFlags },
      { component: 'sefaz-homologation-connector', domain: FiscalDedicatedHomologationDomain.SEFAZ_CONNECTOR, ...baseFlags },
      { component: 'certificate-a1-vault', domain: FiscalDedicatedHomologationDomain.CERTIFICATE, ...baseFlags },
      { component: 'xml-signer-homologation', domain: FiscalDedicatedHomologationDomain.XML_SIGNER, ...baseFlags },
      { component: 'danfe-renderer-homologation', domain: FiscalDedicatedHomologationDomain.DANFE_RENDERER, ...baseFlags },
      { component: 'observability-persistence', domain: FiscalDedicatedHomologationDomain.OBSERVABILITY, ...baseFlags },
      { component: 'rollback-control', domain: FiscalDedicatedHomologationDomain.ROLLBACK, ...baseFlags },
      { component: 'kill-switch-control', domain: FiscalDedicatedHomologationDomain.KILL_SWITCH, ...baseFlags },
      { component: 'rate-limit-control', domain: FiscalDedicatedHomologationDomain.SEFAZ_CONNECTOR, ...baseFlags }
    ];
  }
}
