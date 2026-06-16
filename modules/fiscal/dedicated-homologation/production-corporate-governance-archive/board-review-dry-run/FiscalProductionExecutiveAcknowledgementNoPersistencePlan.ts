export class FiscalProductionExecutiveAcknowledgementNoPersistencePlan {
  public static getPlan() {
    return {
      executiveAcknowledgementNoPersistencePlanGenerated: true,
      realAcknowledgementRecordPersisted: false,
      realBoardRecordPersisted: false,
      description: 'Impedir persistência de acknowledgement.'
    };
  }
}
