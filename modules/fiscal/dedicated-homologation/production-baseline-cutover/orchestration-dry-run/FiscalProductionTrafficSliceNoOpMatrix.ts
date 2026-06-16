export class FiscalProductionTrafficSliceNoOpMatrix {
  public static getMatrix() {
    return {
      trafficSliceNoOpMatrixGenerated: true,
      trafficChanged: false,
      canaryActivated: false,
      description: 'Modelagem fatiamento percentual de tráfego em simulação. Não altera tráfego real. Não ativa canary real.'
    };
  }
}
