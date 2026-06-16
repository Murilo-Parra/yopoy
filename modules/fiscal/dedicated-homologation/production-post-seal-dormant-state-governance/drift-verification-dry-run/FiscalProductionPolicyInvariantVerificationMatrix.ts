export class FiscalProductionPolicyInvariantVerificationMatrix {
  public static getMatrix() {
    return {
      policyInvariantVerificationMatrixGenerated: true,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      description: 'Verificação de invariantes de policy.'
    };
  }
}
