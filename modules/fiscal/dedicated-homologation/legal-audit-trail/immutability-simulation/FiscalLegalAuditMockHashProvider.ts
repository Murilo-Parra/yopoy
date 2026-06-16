export class FiscalLegalAuditMockHashProvider {
  public static generateMockHash() {
    return {
      mockHashGenerated: true,
      realHashCalculated: false,
      legalHashDefinitive: false,
      sensitiveDataIncluded: false,
      mockHashValue: 'mock-synthetic-hash-' + new Date().getTime(),
      description: 'Generates synthetic non-legal mock hash for simulation purposes.'
    };
  }
}
