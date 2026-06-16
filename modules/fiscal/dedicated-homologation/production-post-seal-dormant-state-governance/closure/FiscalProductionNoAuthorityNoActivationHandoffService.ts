export class FiscalProductionNoAuthorityNoActivationHandoffService {
  public static getHandoff() {
    return {
      noAuthorityNoActivationHandoffGenerated: true,
      realHandoffConcluded: false,
      description: 'Handoff simulado declarando ausência de autoridade e ativação.'
    };
  }
}
