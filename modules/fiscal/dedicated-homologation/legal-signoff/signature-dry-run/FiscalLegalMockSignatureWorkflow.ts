export class FiscalLegalMockSignatureWorkflow {
  public static simulateWorkflow() {
    return {
      mockSignatureWorkflowGenerated: true,
      mockSignatureSimulated: true,
      realLegalSignOffGranted: false,
      legalSignaturePersisted: false,
      description: 'Simulated mock signature workflow. Does not use real cryptographic library. Does not call external signature service.'
    };
  }
}
