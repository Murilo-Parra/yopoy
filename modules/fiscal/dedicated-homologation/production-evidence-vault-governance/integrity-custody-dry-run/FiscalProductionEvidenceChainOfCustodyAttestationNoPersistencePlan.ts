export class FiscalProductionEvidenceChainOfCustodyAttestationNoPersistencePlan {
  public static getPlan() {
    return {
      chainOfCustodyAttestationNoPersistencePlanGenerated: true,
      chainOfCustodyPersisted: false,
      realAuditRecordPersisted: false,
      description: 'Modelar atestação de chain-of-custody. Não persistir custódia real.'
    };
  }
}
