export class FiscalProductionRuntimeLockEvidenceReview {
  public static getReview() {
    return {
      runtimeLockEvidenceReviewGenerated: true,
      runtimeExecutionStarted: false,
      commandQueueStarted: false,
      workersCreated: false,
      description: 'Revisa evidência de runtime travado. Não cria queue, worker, job, scheduler ou cron.'
    };
  }
}
