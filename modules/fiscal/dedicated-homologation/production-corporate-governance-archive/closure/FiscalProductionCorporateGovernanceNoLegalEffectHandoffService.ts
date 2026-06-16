export class FiscalProductionCorporateGovernanceNoLegalEffectHandoffService {
  public static getHandoff() {
    return {
      noLegalEffectHandoffGenerated: true,
      approvedForRealBoardApproval: false,
      approvedForRealGoLiveExecution: false,
      description: 'Declarar que o fechamento não tem efeito jurídico, regulatório, operacional ou produtivo.'
    };
  }
}
