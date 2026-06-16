export class FiscalProductionTrafficNoRoutingHandoffService {
  public static getHandoff() {
    return {
      noRoutingHandoffGenerated: true,
      realHandoffConcluded: false,
      realAuthorizationGranted: false,
      description: 'Simular handoff final sem roteamento e sem autorização. Não destravar gate. Não concluir handoff operacional real.'
    };
  }
}
