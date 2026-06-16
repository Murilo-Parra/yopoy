export class FiscalProductionNoRetentionNoCustodyHandoffService {
  public static simulateHandoff() {
    return {
      noRetentionNoCustodyHandoffGenerated: true,
      realRetentionCreated: false,
      realCustodyCreated: false,
      realHandoffConcluded: false,
      description: 'Simular handoff de ausência de retenção/custódia real.'
    };
  }
}
