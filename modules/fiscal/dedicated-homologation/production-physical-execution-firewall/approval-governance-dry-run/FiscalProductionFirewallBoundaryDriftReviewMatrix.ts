export class FiscalProductionFirewallBoundaryDriftReviewMatrix {
  public static getMatrix() {
    return {
      boundaryDriftReviewMatrixGenerated: true,
      executableDriftDetected: false,
      physicalBypassDetected: false,
      realInfrastructureScannerExecuted: false,
      description: 'Revisar os outputs do 34.2 sem executar nova verificação real.'
    };
  }
}
