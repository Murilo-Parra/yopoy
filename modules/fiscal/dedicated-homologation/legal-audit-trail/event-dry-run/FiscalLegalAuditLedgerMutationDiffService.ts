export class FiscalLegalAuditLedgerMutationDiffService {
  public static generateDiff() {
    return {
      mutationDiffGenerated: true,
      rawValuesIncluded: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      diff: [
        '+ Insert Event into legal_audit_ledger',
        'Field: eventType (NEW)',
        'Field: actorRef (NEW)'
      ],
      description: 'Simulates difference between planned event mutation and expected ledger state without sensitive data.'
    };
  }
}
