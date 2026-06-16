export class FiscalProductionNoLoadBalancerSwitchEvidence {
  public static getEvidence() {
    return {
      noLoadBalancerSwitchEvidenceGenerated: true,
      realLoadBalancerSwitched: false,
      realDnsChanged: false,
      description: 'Evidenciar ausência de switch real de load balancer.'
    };
  }
}
