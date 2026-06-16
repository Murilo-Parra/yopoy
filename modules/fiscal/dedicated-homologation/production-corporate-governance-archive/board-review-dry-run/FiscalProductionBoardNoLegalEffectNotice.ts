export class FiscalProductionBoardNoLegalEffectNotice {
  public static getNotice() {
    return {
      boardNoLegalEffectNoticeGenerated: true,
      approvedForRealBoardApproval: false,
      approvedForRealGoLiveExecution: false,
      description: 'Declarar ausência de efeito legal, regulatório, operacional e produtivo.'
    };
  }
}
