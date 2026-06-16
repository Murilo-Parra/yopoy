export class FiscalProductionDnsNoChangePlan {
  public static getPlan() {
    return {
      dnsNoChangePlanGenerated: true,
      realDnsChanged: false,
      description: 'Modelar DNS sem alteração.'
    };
  }
}
