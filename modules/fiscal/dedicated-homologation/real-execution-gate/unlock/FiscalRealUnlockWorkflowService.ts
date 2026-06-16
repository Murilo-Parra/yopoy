export class FiscalRealUnlockWorkflowService {
  public static simulateWorkflow() {
    return {
      status: 'BLOCKED_FOR_REAL_UNLOCK',
      stages: [
        { name: 'REQUESTED', completedForSimulation: true },
        { name: 'PRIMARY_APPROVAL_SIMULATED', completedForSimulation: true },
        { name: 'SECONDARY_APPROVAL_SIMULATED', completedForSimulation: true },
        { name: 'BLOCKED_FOR_REAL_UNLOCK', completedForSimulation: true }
      ],
      result: 'Workflow completed in simulation mode only. Real unlock blocked.',
      realUnlockApproved: false,
      dmlPersisted: false,
      externalNotificationsSent: false
    };
  }
}
