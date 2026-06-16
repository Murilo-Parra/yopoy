export class FiscalProductionLoadBalancerDnsBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-LB-DNS-01: Change to Real DNS blocked.',
      'B-LB-DNS-02: Switching to Real Load Balancer blocked.',
      'B-LB-DNS-03: Real Gateway mutations blocked.',
      'B-LB-DNS-04: Network record writings blocked.',
      'B-LB-DNS-05: Real Traffic mutability blocked.',
      'B-LB-DNS-06: V2 endpoint activation blocked.',
      'B-LB-DNS-07: Route to V2 blocked.',
      'B-LB-DNS-08: Legacy endpoint continuity must be preserved.'
    ];
  }
}
