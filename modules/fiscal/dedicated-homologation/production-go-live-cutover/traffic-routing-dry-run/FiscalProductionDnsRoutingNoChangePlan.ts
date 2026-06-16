export class FiscalProductionDnsRoutingNoChangePlan {
  public static getPlan() {
    return {
      dnsRoutingNoChangePlanGenerated: true,
      realDnsChanged: false,
      trafficChanged: false,
      description: 'Modelar DNS/routing sem alteração real.'
    };
  }
}
