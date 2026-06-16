export class FiscalRealAuthorizationClosureInventory {
  public static getInventory() {
    return [
      {
        moduleId: '15.1',
        moduleName: 'Authorization Request Intake',
        status: 'INTAKE_SIMULATION_ONLY',
        closureReady: true,
        authorizationRequestPersisted: false,
        authorizationEnvelopeExecutable: false,
        authorizationEnvelopeSigned: false,
        authorizationEnvelopePersisted: false,
        realAuthorizationGranted: false,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realExecutionStarted: false,
        infrastructureProvisioned: false,
        realSefazCalled: false,
        certificateLoaded: false,
        xmlSigned: false,
        pdfGenerated: false,
        productionV2Activated: false
      },
      {
        moduleId: '15.2',
        moduleName: 'Dual Approval Simulation & Segregation of Duties Review',
        status: 'DUAL_APPROVAL_SIMULATED',
        closureReady: true,
        dualApprovalCompleted: false,
        realApprovalGranted: false,
        realAuthorizationGranted: false,
        approvalRecordPersisted: false,
        approverANotifiedExternally: false,
        approverBNotifiedExternally: false,
        sameUserApprovalBlocked: true,
        realExecutionGateUnlocked: false,
        realExecutionAuthorized: false,
        realExecutionStarted: false,
        infrastructureProvisioned: false,
        realSefazCalled: false,
        certificateLoaded: false,
        xmlSigned: false,
        pdfGenerated: false,
        productionV2Activated: false
      }
    ];
  }
}
