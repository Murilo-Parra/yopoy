export class FiscalProductionGoLiveNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realHandoffConcluded: false,
      realAuthorizationGranted: false,
      description: 'Modelar handoff sem ativação real. Não concluir handoff operacional real. Não conceder autorização real.'
    };
  }
}
