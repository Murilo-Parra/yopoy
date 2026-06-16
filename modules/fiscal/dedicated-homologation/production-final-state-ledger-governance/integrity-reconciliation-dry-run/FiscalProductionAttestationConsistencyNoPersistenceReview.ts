export class FiscalProductionAttestationConsistencyNoPersistenceReview {
  public static getReview() {
    return {
      attestationConsistencyNoPersistenceReviewGenerated: true,
      realAttestationPersisted: false,
      realConsistencyResultPersisted: false,
      description: 'Revisar atestado virtual sem persistência.'
    };
  }
}
