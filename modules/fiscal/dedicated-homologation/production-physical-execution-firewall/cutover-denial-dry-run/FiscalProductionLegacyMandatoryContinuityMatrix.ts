export class FiscalProductionLegacyMandatoryContinuityMatrix {
  public static getMatrix() {
    return {
      legacyMandatoryContinuityMatrixGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Modelar preservação obrigatória do legado. Não desativar rota legada.'
    };
  }
}
