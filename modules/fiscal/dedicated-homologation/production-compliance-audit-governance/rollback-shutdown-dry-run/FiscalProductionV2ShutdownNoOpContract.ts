export class FiscalProductionV2ShutdownNoOpContract {
  public static getContract() {
    return {
      v2ShutdownNoOpContractGenerated: true,
      realV2ShutdownExecuted: false,
      realKillSwitchActivated: false,
      description: 'Modelar shutdown V2 como contrato no-op. Não desligar V2 real. Não ativar kill-switch real.'
    };
  }
}
