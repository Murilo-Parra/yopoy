export class FiscalProductionTrafficSwitchNoOpMatrix {
  public static getMatrix() {
    return {
      trafficSwitchNoOpMatrixGenerated: true,
      trafficChanged: false,
      realShadowTrafficEnabled: false,
      description: 'Modelar switch de tráfego como no-op. Não alterar tráfego real.'
    };
  }
}
