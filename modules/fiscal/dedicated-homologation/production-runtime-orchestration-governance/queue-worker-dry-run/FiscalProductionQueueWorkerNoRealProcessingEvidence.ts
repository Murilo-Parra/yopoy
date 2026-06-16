export class FiscalProductionQueueWorkerNoRealProcessingEvidence {
  public static getEvidence() {
    return {
      queueWorkerNoRealProcessingEvidenceGenerated: true,
      realPayloadProcessed: false,
      realJobEnqueued: false,
      description: 'Evidenciar ausência de processamento real de job/payload.'
    };
  }
}
