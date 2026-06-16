export class FiscalOperationalCommunicationMatrix {
  public static generateMatrix() {
    return {
      communicationMatrixGenerated: true,
      externalOperatorNotified: false,
      realNotificationsSent: false,
      description: 'Model of future operational communication. No external operators notified.'
    };
  }
}
