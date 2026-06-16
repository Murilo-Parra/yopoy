export class FiscalProductionRollbackReversionDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      dependencies: ['24', '25', '26', '27', '28', '29', '30.1', '30.2', '30.3'],
      description: 'Consolidar dependências dos domínios 24, 25, 26, 27, 28, 29, 30.1, 30.2 e 30.3. Nenhuma dependência concede rollback real, abort real, reversion real, cutover real, gate unlock real ou Produção V2.'
    };
  }
}
