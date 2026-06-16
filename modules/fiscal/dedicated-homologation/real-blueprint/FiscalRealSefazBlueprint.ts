export class FiscalRealSefazBlueprint {
  public static getBlueprint() {
    return {
      environment: 'Homologação',
      plannedSupportedUfs: ['SP', 'MG', 'RJ', 'PR', 'SC', 'RS', 'Nacional'],
      plannedTimeout: '10s para NFe, 5s para NFCe',
      plannedRetryPolicy: 'Exponencial backoff (3 tentativas)',
      plannedCircuitBreaker: 'Fallback para modo assíncrono (contingência offline simulada)',
      realSefazCalled: false,
      endpointCalled: false
    };
  }
}
