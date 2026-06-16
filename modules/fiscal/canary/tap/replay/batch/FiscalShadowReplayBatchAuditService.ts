import { FiscalSafeAuditSerializer } from "../../../proxy/FiscalSafeAuditSerializer";

export class FiscalShadowReplayBatchAuditService {
  private records: any[] = [];
  private safeSerializer: FiscalSafeAuditSerializer;

  constructor() {
    this.safeSerializer = new FiscalSafeAuditSerializer();
  }

  public logBatchAction(result: any, type: string) {
    const decisionMock = {
      dispatched: false,
      legacyOfficial: true,
      v2Official: false,
      routeToV2: false,
      routeToLegacy: true,
      simulationOnly: true,
      activationBlocked: true,
      warnings: result.warnings || [],
      blockers: result.blockers || []
    };

    const comparisonMock = {
      matched: true,
      differenceCount: 0,
      differences: [],
      severity: "LOW",
      sanitized: true,
      payloadPersisted: false
    };

    const safeOutput = this.safeSerializer.serializeForAudit("REPLAY_BATCH", type, decisionMock, comparisonMock);

    this.records.push({
      id: `BATCHAUDIT-${Math.random().toString(36).substring(7)}`,
      action: "SHADOW_REPLAY_BATCH_SIMULATED",
      event: {
        type,
        batchId: result.batchId || "UNKNOWN",
        status: result.status,
        safeMetadata: safeOutput,
        sanitizedResult: {
           sanitized: true,
           simulationOnly: true,
           activationBlocked: true
        }
      },
      createdAt: new Date().toISOString()
    });
  }

  public getBatchAuditRecords() {
    return this.records;
  }
}
