export class FiscalProductionHardExecutionLockContract {
  public static getContract() {
    return {
      hardExecutionLockContractGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      description: 'Modelagem de contrato de bloqueio rígido de execução. Não destrava gate nem concede autorização real.'
    };
  }
}
