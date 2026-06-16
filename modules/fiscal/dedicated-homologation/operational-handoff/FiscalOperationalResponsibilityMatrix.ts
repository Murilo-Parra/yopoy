export class FiscalOperationalResponsibilityMatrix {
  public static generateMatrix() {
    return {
      responsibilityMatrixGenerated: true,
      roles: ['engineering', 'support', 'fiscal', 'SRE', 'legal', 'administration'],
      documentalMatrix: true,
      externalOperatorNotified: false,
      description: 'Map of future roles. Documental matrix only. No external users notified.'
    };
  }
}
