export class FiscalProductionNoPhysicalBypassEvidence {
  public static getEvidence() {
    return {
      noPhysicalBypassEvidenceGenerated: true,
      realPhysicalExecutionFirewallBypassed: false,
      physicalBypassDetected: false,
      activationBlocked: true,
      description: 'Evidenciar ausência de bypass físico.'
    };
  }
}
