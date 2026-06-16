export class FiscalProductionFinalStateProofNoCreatePlan {
  public static getPlan() {
    return {
      finalStateProofNoCreatePlanGenerated: true,
      realProofCreated: false,
      realCryptographicProofCreated: false,
      realMerkleTreeCreated: false,
      realMerkleProofCreated: false,
      description: 'Impedir proof real, proof chain, Merkle tree ou proof criptográfica.'
    };
  }
}
