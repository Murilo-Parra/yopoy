export class FiscalDedicatedSefazContract {
  public static getContract() {
    return {
      description: 'Contrato futuro para conector SEFAZ homologação',
      rateLimitsPlanned: true as true,
      timeoutPlanned: true as true,
      circuitBreakerPlanned: true as true,
      realSefazCalled: false as false,
      endpointCalled: false as false
    };
  }
}
