export class FiscalDedicatedDatabaseContract {
  public static getContract() {
    return {
      description: 'Futuro banco de dados postgres dedicado para homologação',
      multiTenantIsolationPlanned: true as true,
      rlsMandatory: true as true,
      databaseProvisioned: false as false,
      dmlExecuted: false as false
    };
  }
}
