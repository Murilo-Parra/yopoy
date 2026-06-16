import { FiscalLoadPlanningClosureRisk } from './FiscalLoadPlanningClosureTypes';

export class FiscalLoadPlanningClosureRiskRegister {
  public static getRisks(): FiscalLoadPlanningClosureRisk[] {
    return [
      { id: 'R-LP-01', severity: 'CRITICAL', description: 'Interpretação indevida de planning-only como autorização de carga real', mitigation: 'Checklist enforce, flag approvedForRealLoadTest.', blockerForRealLoad: true },
      { id: 'R-LP-02', severity: 'HIGH', description: 'Ausência de validação com tráfego real', mitigation: 'Must be done in a dedicated real load test environment later.', blockerForRealLoad: false },
      { id: 'R-LP-03', severity: 'HIGH', description: 'Ausência de validação com concorrência real', mitigation: 'Deferred to execution phase.', blockerForRealLoad: false },
      { id: 'R-LP-04', severity: 'HIGH', description: 'Ausência de validação de latência real', mitigation: 'Only mathematical models so far. Needs active monitoring when live.', blockerForRealLoad: false },
      { id: 'R-LP-05', severity: 'HIGH', description: 'Ausência de validação de I/O real em banco', mitigation: 'Database simulation required in real load test.', blockerForRealLoad: false },
      { id: 'R-LP-06', severity: 'CRITICAL', description: 'Risco futuro de saturação se runner for ativado sem limite', mitigation: 'Must implement circuit breakers and hard limits in real runner.', blockerForRealLoad: true },
      { id: 'R-LP-07', severity: 'CRITICAL', description: 'Risco futuro de acionar SEFAZ por engano em cenário CRITICAL', mitigation: 'Strict isolation needed, plus network-level blocks to SEFAZ URLs during test.', blockerForRealLoad: true },
      { id: 'R-LP-08', severity: 'CRITICAL', description: 'Risco futuro de assinar XML ou gerar PDF sob carga sem isolamento', mitigation: 'Mock workers needed for compute-heavy paths during load testing.', blockerForRealLoad: true },
      { id: 'R-LP-09', severity: 'HIGH', description: 'Necessidade futura de rate limit e circuit breaker', mitigation: 'Must be designed into the real shadow gateway.', blockerForRealLoad: true },
      { id: 'R-LP-10', severity: 'HIGH', description: 'Necessidade futura de ambiente dedicado de carga', mitigation: 'Load tests should not run against production db directly unless isolated.', blockerForRealLoad: true },
      { id: 'R-LP-11', severity: 'HIGH', description: 'Necessidade futura de orçamento de latência e rollback', mitigation: 'Load test results must map directly to the latency budget.', blockerForRealLoad: true },
      { id: 'R-LP-12', severity: 'MEDIUM', description: 'Risco de cenários sintéticos divergirem do comportamento real', mitigation: 'Compare synthetic shape to real shape in telemetry later.', blockerForRealLoad: false }
    ];
  }
}
