export class FiscalProductionNoRealLedgerEntryEvidence {
  public static getEvidence() {
    return {
      noRealLedgerEntryEvidenceGenerated: true,
      realLedgerEntryCreated: false,
      description: 'Evidenciar que nenhuma ledger entry real foi criada.'
    };
  }
}
