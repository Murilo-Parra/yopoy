export class FiscalProductionPhysicalCutoverAttemptDenialMatrix {
  public static getMatrix() {
    return {
      physicalCutoverAttemptDenialMatrixGenerated: true,
      realCutoverAttemptDenied: true,
      realCutoverExecuted: false,
      activationBlocked: true,
      description: 'Modelar negação de tentativa de cutover físico. Não executar cutover real.'
    };
  }
}
