export class FiscalLegalAuditEvidenceDigestBuilder {
  public static buildDigest() {
    return {
      evidenceDigestGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      rawValuesIncluded: false,
      digestContents: {
        eventType: 'MOCK_EVENT',
        actorRole: 'SYSTEM_SIMULATION',
        timestamp: new Date().toISOString()
      },
      description: 'Sanitized evidence digest builder omitting raw request bodies and secrets.'
    };
  }
}
