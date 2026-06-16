import { FiscalSafeAuditSerializer } from "../../proxy/FiscalSafeAuditSerializer";

export class FiscalShadowReplayAuditService {
  private records: any[] = [];
  private safeSerializer: FiscalSafeAuditSerializer;

  constructor() {
    this.safeSerializer = new FiscalSafeAuditSerializer();
  }

  public logReplayAction(result: any, type: string) {
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
      matched: result.matched !== undefined ? result.matched : true,
      differenceCount: result.differenceCount || 0,
      differences: [],
      severity: "LOW",
      sanitized: true,
      payloadPersisted: false
    };

    const safeOutput = this.safeSerializer.serializeForAudit("REPLAY_QUEUE", type, decisionMock, comparisonMock);

    this.records.push({
      id: `REPLAYAUDIT-${Math.random().toString(36).substring(7)}`,
      action: "SHADOW_REPLAY_SIMULATED",
      event: {
        type,
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

  public getReplayAuditRecords() {
    return this.records;
  }
}
