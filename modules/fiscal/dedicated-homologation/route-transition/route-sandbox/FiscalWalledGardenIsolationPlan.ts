export class FiscalWalledGardenIsolationPlan {
  public static generatePlan() {
    return {
      walledGardenIsolationGenerated: true,
      walledGardenIsolationOnly: true,
      walledGardenCreated: false,
      networkProvisioned: false,
      databaseProvisioned: false,
      trafficChanged: false,
      description: 'Documentary walled garden isolation plan. No real networks or databases are provisioned.'
    };
  }
}
