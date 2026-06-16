export class FiscalProductionLifecycleRunnerNoOpMatrix {
  public static getMatrix() {
    return {
      lifecycleRunnerNoOpMatrixGenerated: true,
      realProcessManagerCreated: false,
      realLifecycleRunnerCreated: false,
      description: 'Modelar process manager e lifecycle runner como no-op.'
    };
  }
}
