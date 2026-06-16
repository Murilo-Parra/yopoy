export class FiscalProductionActivationSeparationOfDutiesMatrix {
  public static getMatrix() {
    return {
      separationOfDutiesMatrixGenerated: true,
      realAuthorizationGranted: false,
      description: 'Modelagem da matriz SoD para ativação futura. Não altera RBAC real nem concede privilégio real.'
    };
  }
}
