export class FiscalProductionTrafficReversionNoOpMatrix {
  public static getMatrix() {
    return {
      trafficReversionNoOpMatrixGenerated: true,
      realTrafficReverted: false,
      trafficChanged: false,
      description: 'Modelar reversão de tráfego como no-op. Não alterar tráfego real.'
    };
  }
}
