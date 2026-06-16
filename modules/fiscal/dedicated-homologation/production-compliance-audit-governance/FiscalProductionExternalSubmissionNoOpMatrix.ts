export class FiscalProductionExternalSubmissionNoOpMatrix {
  public static getMatrix() {
    return {
      externalSubmissionNoOpMatrixGenerated: true,
      realRegulatorNotified: false,
      realAuditorNotified: false,
      emailSent: false,
      description: 'Modelar submissão externa como no-op. Não enviar auditor, regulador, stakeholder, cliente ou aprovador.'
    };
  }
}
