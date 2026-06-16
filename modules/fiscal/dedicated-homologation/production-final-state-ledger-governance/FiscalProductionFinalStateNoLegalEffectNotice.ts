export class FiscalProductionFinalStateNoLegalEffectNotice {
  public static getNotice() {
    return {
      finalStateNoLegalEffectNoticeGenerated: true,
      approvedForRealGoLiveExecution: false,
      approvedForActivationAuthorityGrant: false,
      description: 'Declarar que o ledger é administrativo, virtual e sem efeito legal de ativação.'
    };
  }
}
