export class FiscalProductionFinalGoLiveNoAuthorityHandoffService {
  public static getHandoff() {
    return {
      noAuthorityHandoffGenerated: true,
      realActivationAuthorityGranted: false,
      approvedForActivationAuthorityGrant: false,
      description: 'Simular handoff final sem autoridade real. Não conceder autoridade, não converter documentação em aprovação real.'
    };
  }
}
