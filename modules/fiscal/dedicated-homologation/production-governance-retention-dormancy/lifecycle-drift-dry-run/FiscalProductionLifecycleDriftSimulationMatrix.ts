export class FiscalProductionLifecycleDriftSimulationMatrix {
  public static getMatrix() {
    return {
      lifecycleDriftSimulationMatrixGenerated: true,
      realLifecycleRecordPersisted: false,
      description: 'Simular drift de lifecycle em matriz administrativa. Não ler registros reais. Não gerar alerta real.'
    };
  }
}
