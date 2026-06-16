export class FiscalProductionEvidenceChainOfCustodyNoPersistencePlan {
  public static getPlan() {
    return {
      chainOfCustodyNoPersistencePlanGenerated: true,
      chainOfCustodyPersisted: false,
      realAuditRecordPersisted: false,
      description: 'Modelar cadeia de custódia sem persistência real.'
    };
  }
}
