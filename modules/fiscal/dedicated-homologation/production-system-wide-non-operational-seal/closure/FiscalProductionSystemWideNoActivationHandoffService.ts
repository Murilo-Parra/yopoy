export class FiscalProductionSystemWideNoActivationHandoffService {
  public static generateHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realActivationHandoffConcluded: false,
      description: 'Simular handoff de ausência de ativação. Não concluir handoff real.'
    };
  }
}
