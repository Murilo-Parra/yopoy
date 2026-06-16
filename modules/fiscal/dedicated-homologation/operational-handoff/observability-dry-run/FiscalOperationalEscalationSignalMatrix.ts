export class FiscalOperationalEscalationSignalMatrix {
  public static generateMatrix() {
    return {
      escalationSignalMatrixGenerated: true,
      externalOperatorNotified: false,
      realMessagesSent: false,
      description: 'Map of future escalation signals. No external operators notified. No real messages sent.'
    };
  }
}
