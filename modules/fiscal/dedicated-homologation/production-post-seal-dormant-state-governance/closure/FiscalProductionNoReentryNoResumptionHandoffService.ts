export class FiscalProductionNoReentryNoResumptionHandoffService {
  public static getHandoff() {
    return {
      noReentryNoResumptionHandoffGenerated: true,
      realHandoffConcluded: false,
      description: 'Handoff simulado declarando ausência de reentrada e retomada.'
    };
  }
}
