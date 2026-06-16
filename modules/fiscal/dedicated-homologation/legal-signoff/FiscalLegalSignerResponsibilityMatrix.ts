export class FiscalLegalSignerResponsibilityMatrix {
  public static generateMatrix() {
    return {
      signerResponsibilityMatrixGenerated: true,
      roles: ['juridico', 'fiscal', 'engenharia', 'seguranca', 'administracao', 'auditoria'],
      externalSignerNotified: false,
      description: 'Map of future roles. Signers are not notified in this phase.'
    };
  }
}
