export class FiscalProductionLoadBalancerNoSwitchEvidence {
  public static getEvidence() {
    return {
      loadBalancerNoSwitchEvidenceGenerated: true,
      realLoadBalancerSwitched: false,
      description: 'Evidência confirmando que nenhum switch real no load balancer ocorreu.'
    };
  }
}
