import { FiscalReleaseReadinessClosureEvidence } from './FiscalReleaseReadinessClosureTypes';

export class FiscalReleaseReadinessClosureEvidenceService {
  public static getEvidence(): FiscalReleaseReadinessClosureEvidence {
    return {
      generatedAt: new Date().toISOString(),
      releaseGatePresent: true,
      rollbackPlanningPresent: true,
      circuitBreakerPlanningPresent: true,
      killSwitchPlanningPresent: true,
      sefazHomologationPlanningPresent: true,
      realReleaseExecuted: false,
      realCanaryActivated: false,
      productionV2Activated: false,
      rollbackExecuted: false,
      circuitBreakerInstalled: false,
      killSwitchActivated: false,
      sefazHomologationActivated: false,
      sefazCalled: false,
      xmlSigned: false,
      pdfGenerated: false,
      trafficChanged: false,
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      readOnly: true,
      governanceOnly: true,
      releasePlanningOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealRelease: false,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}
