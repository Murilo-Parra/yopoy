export class FiscalProductionSnapshotLineageNoVerifyMatrix {
  public static getMatrix() {
    return {
      snapshotLineageNoVerifyMatrixGenerated: true,
      realExternalApiCalled: false,
      realSefazCalled: false,
      description: 'Simular lineage documental sem verificação real de origem. Não chamar APIs externas, SEFAZ, cartório, storage ou banco.'
    };
  }
}
