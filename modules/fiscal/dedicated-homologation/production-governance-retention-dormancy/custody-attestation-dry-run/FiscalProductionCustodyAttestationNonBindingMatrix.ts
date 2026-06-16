export class FiscalProductionCustodyAttestationNonBindingMatrix {
  public static getMatrix() {
    return {
      custodyAttestationNonBindingMatrixGenerated: true,
      approvedForRealCustodyAttestation: false,
      description: 'Simular attestation não vinculante. Não gerar valor jurídico, regulatório ou produtivo.'
    };
  }
}
