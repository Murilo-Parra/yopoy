import { FiscalShadowMirrorGovernanceRisk } from './FiscalShadowMirrorGovernanceTypes';

export class FiscalShadowMirrorGovernanceRiskRegister {
  public static getRisks(): FiscalShadowMirrorGovernanceRisk[] {
    return [
      { id: 'R-SM-01', severity: 'CRITICAL', description: 'Interpretação indevida de design-only como autorização de captura real', mitigation: 'Checklist enforce, flag approvedForRealCapture.', blockerForRealActivation: true },
      { id: 'R-SM-02', severity: 'HIGH', description: 'Ausência de validação com tráfego real', mitigation: 'Deferred to next domains, synthetic validation provides initial shape match.', blockerForRealActivation: false },
      { id: 'R-SM-03', severity: 'CRITICAL', description: 'Ausência de validação com SEFAZ real', mitigation: 'Deferred until Sandbox endpoints, never via proxy capture.', blockerForRealActivation: false },
      { id: 'R-SM-04', severity: 'HIGH', description: 'Ausência de assinatura XML real', mitigation: 'Deferred until Sandbox domain tests payload shaping.', blockerForRealActivation: false },
      { id: 'R-SM-05', severity: 'HIGH', description: 'Ausência de geração PDF real', mitigation: 'Deferred until Sandbox.', blockerForRealActivation: false },
      { id: 'R-SM-06', severity: 'MEDIUM', description: 'Dependência de eventos sintéticos, não produção', mitigation: 'Limits exposure. Future real telemetry needs safe sampling.', blockerForRealActivation: false },
      { id: 'R-SM-07', severity: 'HIGH', description: 'Necessidade futura de testes de carga', mitigation: 'Tap design requires load tests before middleware hook.', blockerForRealActivation: true },
      { id: 'R-SM-08', severity: 'CRITICAL', description: 'Necessidade futura de plano formal de instalação de middleware', mitigation: 'Governance handover explicitly calls this out.', blockerForRealActivation: true },
      { id: 'R-SM-09', severity: 'CRITICAL', description: 'Necessidade futura de rollback operacional real', mitigation: 'Must design killswitch for express middleware.', blockerForRealActivation: true },
      { id: 'R-SM-10', severity: 'CRITICAL', description: 'Risco de sanitização incompleta se campos sensíveis novos surgirem', mitigation: 'Recursive sanitizers and strict blocklists established.', blockerForRealActivation: true },
      { id: 'R-SM-11', severity: 'HIGH', description: 'Risco de latência se captura real for instalada sem budget formal', mitigation: 'Asynchronous event loops needed in future tap.', blockerForRealActivation: true },
      { id: 'R-SM-12', severity: 'MEDIUM', description: 'Risco de divergência entre shape sintético e shape real', mitigation: 'Capture dry-run tests cover this synthetically, requires monitor on upgrade.', blockerForRealActivation: false }
    ];
  }
}
