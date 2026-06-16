export class FiscalDedicatedRollbackContract {
  public static getContract() {
    return {
      description: 'Contrato futuro para controles de rollback e circuit breaker',
      rollbackPlanned: true as true,
      killSwitchPlanned: true as true,
      circuitBreakerPlanned: true as true,
      rollbackInstalled: false as false,
      killSwitchInstalled: false as false,
      circuitBreakerInstalled: false as false
    };
  }
}
