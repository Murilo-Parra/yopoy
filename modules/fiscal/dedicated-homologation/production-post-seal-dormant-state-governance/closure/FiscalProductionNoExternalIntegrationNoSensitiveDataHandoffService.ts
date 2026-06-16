export class FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService {
  public static getHandoff() {
    return {
      noExternalIntegrationNoSensitiveDataHandoffGenerated: true,
      realHandoffConcluded: false,
      description: 'Handoff simulado declarando isolamento de integração externa e dados sensíveis.'
    };
  }
}
