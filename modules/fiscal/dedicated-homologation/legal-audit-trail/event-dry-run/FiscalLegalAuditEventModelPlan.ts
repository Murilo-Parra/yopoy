export class FiscalLegalAuditEventModelPlan {
  public static generatePlan() {
    return {
      eventModelPlanGenerated: true,
      legalAuditEventPersisted: false,
      legalAuditTrailPersisted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      plannedFields: [
        'eventId',
        'companyId',
        'requestId',
        'approvalRecordRef',
        'eventType',
        'actorRole',
        'actorRef',
        'governanceSummary',
        'riskSummary',
        'blockerSummary',
        'retentionClass',
        'version',
        'createdAt'
      ],
      description: 'Event model planned for append-only execution. No real event persisted. No raw payload. No secrets.'
    };
  }
}
