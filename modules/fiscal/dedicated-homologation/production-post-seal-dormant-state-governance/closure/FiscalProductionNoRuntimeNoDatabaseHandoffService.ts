export class FiscalProductionNoRuntimeNoDatabaseHandoffService {
  public static getHandoff() {
    return {
      noRuntimeNoDatabaseHandoffGenerated: true,
      realHandoffConcluded: false,
      description: 'Handoff simulado declarando isolamento de runtime e banco.'
    };
  }
}
