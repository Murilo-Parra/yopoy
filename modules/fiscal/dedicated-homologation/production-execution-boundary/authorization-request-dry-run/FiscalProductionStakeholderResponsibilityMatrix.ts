export class FiscalProductionStakeholderResponsibilityMatrix {
  public static generateMatrix() {
    return {
      stakeholderResponsibilityMatrixGenerated: true,
      externalStakeholderNotified: false,
      description: 'Models stakeholders and their roles. Does not dispatch real emails, webhooks, or notifications.'
    };
  }
}
