export class FiscalDedicatedClosureRiskRegister {
  public static getRisks() {
    return [
      {
        id: 'R-DC-01',
        severity: 'HIGH',
        probability: 'MEDIUM',
        impact: 'HIGH',
        description: 'Gap entre mock/replay sintético e homologação real.',
        mitigation: 'Garantir que a homologação real ocorrerá isolada da V1.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-02',
        severity: 'CRITICAL',
        probability: 'HIGH',
        impact: 'CRITICAL',
        description: 'Ausência de certificado real validado.',
        mitigation: 'Aguardar próximo módulo para carregar no Vault real.',
        requiresFutureModule: true,
        blockerForRealActivation: true
      },
      {
        id: 'R-DC-03',
        severity: 'CRITICAL',
        probability: 'HIGH',
        impact: 'CRITICAL',
        description: 'Ausência de conexão SEFAZ homologação real.',
        mitigation: 'Programar disparos em janela de homologação controlada.',
        requiresFutureModule: true,
        blockerForRealActivation: true
      },
      {
        id: 'R-DC-04',
        severity: 'MEDIUM',
        probability: 'LOW',
        impact: 'MEDIUM',
        description: 'Ausência de load test real.',
        mitigation: 'Realizar stress test no ambiente provisionado futuro.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-05',
        severity: 'HIGH',
        probability: 'MEDIUM',
        impact: 'HIGH',
        description: 'Ausência de observabilidade persistente real.',
        mitigation: 'Configurar sinks de log sem dado sensível futuramente.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-06',
        severity: 'CRITICAL',
        probability: 'MEDIUM',
        impact: 'CRITICAL',
        description: 'Ausência de rollback real testado.',
        mitigation: 'Testar mecanismo kill-switch em ambiente de homologação real.',
        requiresFutureModule: true,
        blockerForRealActivation: true
      },
      {
        id: 'R-DC-07',
        severity: 'HIGH',
        probability: 'MEDIUM',
        impact: 'HIGH',
        description: 'Risco de divergência de schemas XML reais.',
        mitigation: 'Validador XSD a ser incluído futuramente.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-08',
        severity: 'MEDIUM',
        probability: 'HIGH',
        impact: 'MEDIUM',
        description: 'Risco de variação de timeouts SEFAZ.',
        mitigation: 'Implementar resiliência no cliente http futuro.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-09',
        severity: 'LOW',
        probability: 'LOW',
        impact: 'LOW',
        description: 'Risco operacional de DANFE real.',
        mitigation: 'Teste isolado de geração e consumo de PDF.',
        requiresFutureModule: true,
        blockerForRealActivation: false
      },
      {
        id: 'R-DC-10',
        severity: 'CRITICAL',
        probability: 'LOW',
        impact: 'CRITICAL',
        description: 'Risco de vazamento se safe-shape for substituído por payload real sem vault.',
        mitigation: 'Harness administrativo deve permanecer restrito e logado.',
        requiresFutureModule: false,
        blockerForRealActivation: true
      }
    ];
  }
}
