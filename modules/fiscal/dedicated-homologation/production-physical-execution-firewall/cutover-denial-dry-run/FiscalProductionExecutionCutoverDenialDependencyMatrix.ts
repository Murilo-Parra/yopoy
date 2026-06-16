export class FiscalProductionExecutionCutoverDenialDependencyMatrix {
  public static getMatrix() {
    return {
      dependencyMatrixGenerated: true,
      domainsCovered: ['28', '29', '30', '31', '32', '33', '34.1', '34.2', '34.3'],
      realCutoverGranted: false,
      realKillSwitchGranted: false,
      realAbortGranted: false,
      realRollbackGranted: false,
      realRuntimeGranted: false,
      realDatabaseGranted: false,
      realSefazGranted: false,
      realGateUnlockGranted: false,
      realAuthorizationGranted: false,
      realTokenIssued: false,
      productionV2Activated: false,
      routeToV2: false,
      description: 'Consolidar dependências dos domínios 28, 29, 30, 31, 32, 33, 34.1, 34.2 e 34.3. Nenhuma dependência concede cutover real, kill-switch real, abort real, rollback real, runtime real, DB real, SEFAZ real, gate unlock real, autorização real, token real, Produção V2 ou routeToV2.'
    };
  }
}
