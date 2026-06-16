export class FiscalRealSecurityWorkflowService {
  public static simulateWorkflow(stage: string = 'REQUESTED') {
    const stages = ['REQUESTED', 'SECURITY_REVIEW', 'FISCAL_REVIEW', 'INFRA_REVIEW', 'LEGAL_REVIEW', 'BLOCKED_FOR_REAL_APPROVAL'];
    return {
      currentStage: stages.includes(stage) ? stage : 'REQUESTED',
      nextStage: 'BLOCKED_FOR_REAL_APPROVAL', // Always resolves to blocked
      isSimulated: true,
      approvalRecorded: false,
      externalNotificationsSent: false,
      dmlExecuted: false
    };
  }
}
