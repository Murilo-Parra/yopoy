export class FiscalProductionSystemWideNoOperationalHandoffService {
  public static generateHandoff() {
    return {
      noOperationalHandoffGenerated: true,
      realOperationalHandoffConcluded: false,
      description: 'Simular handoff de não operação. Não concluir handoff real.'
    };
  }
}
