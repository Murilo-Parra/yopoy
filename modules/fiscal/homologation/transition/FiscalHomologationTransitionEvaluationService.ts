import { FiscalHomologationTransitionEvaluationInput, FiscalHomologationTransitionEvaluationResult, FiscalHomologationTransitionStatus } from './FiscalHomologationTransitionTypes';

export class FiscalHomologationTransitionEvaluationService {
  public static evaluate(input: FiscalHomologationTransitionEvaluationInput): FiscalHomologationTransitionEvaluationResult {
    const blockers: string[] = [];

    if (input.forceTransition) {
      blockers.push('forceTransition true is administratively blocked.');
    }
    if (input.forceRealHomologation) {
      blockers.push('forceRealHomologation true is administratively blocked.');
    }
    if (input.requestedAction && input.requestedAction.toLowerCase().includes('prod')) {
      blockers.push('Productive requested actions are blocked.');
    }

    blockers.push('Homologation Transition 10.5 é planejamento administrativo. Phase-out real, ambiente dedicado real, SEFAZ real, certificado real, XML real assinado, PDF real e Produção V2 permanecem bloqueados.');

    return {
      success: false,
      status: FiscalHomologationTransitionStatus.BLOCKED_FOR_REAL_HOMOLOGATION,
      transitionExecuted: false,
      mockPhaseOutExecuted: false,
      dedicatedEnvironmentActivated: false,
      realHomologationActivated: false,
      realSefazCalled: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      blockers,
      warnings: [],
      readOnly: true,
      transitionPlanningOnly: true,
      phaseOutPlanningOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForTransitionExecution: false,
      approvedForMockPhaseOut: false,
      approvedForDedicatedEnvironmentActivation: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    };
  }
}
