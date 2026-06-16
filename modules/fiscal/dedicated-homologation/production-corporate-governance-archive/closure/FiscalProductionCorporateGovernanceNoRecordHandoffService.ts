export class FiscalProductionCorporateGovernanceNoRecordHandoffService {
  public static getHandoff() {
    return {
      noRecordHandoffGenerated: true,
      realArchiveRecordPersisted: false,
      realContinuityRecordPersisted: false,
      realBoardRecordPersisted: false,
      realAcknowledgementRecordPersisted: false,
      description: 'Simular handoff final sem registro real.'
    };
  }
}
