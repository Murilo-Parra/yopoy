export class FiscalProductionV2ShutdownNoOpMatrix {
  public static getMatrix() {
    return {
      v2ShutdownNoOpMatrixGenerated: true,
      realShutdownExecuted: false,
      realKillSwitchActivated: false,
      description: 'Modelar shutdown V2 como no-op. Não desligar V2 real. Não ativar kill-switch real.'
    };
  }
}
