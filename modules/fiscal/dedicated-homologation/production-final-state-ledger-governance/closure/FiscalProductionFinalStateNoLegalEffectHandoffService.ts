export class FiscalProductionFinalStateNoLegalEffectHandoffService {
  public static getHandoff() {
    return {
      noLegalEffectHandoffGenerated: true,
      realLegalActivationRecordCreated: false,
      approvedForRealGoLiveExecution: false,
      description: 'Declarar que o fechamento não tem efeito jurídico, regulatório ou operacional.'
    };
  }
}
