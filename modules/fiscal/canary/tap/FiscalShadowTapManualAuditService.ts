import { FiscalSafeAuditSerializer } from "../proxy/FiscalSafeAuditSerializer";

export class FiscalShadowTapManualAuditService {
  private records: any[] = [];
  private safeSerializer: FiscalSafeAuditSerializer;

  constructor() {
    this.safeSerializer = new FiscalSafeAuditSerializer();
  }

  public logManualSimulation(result: any, type: string) {
    // We construct a mock decision and comparison to satisfy the serializer interface
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

    const safeOutput = this.safeSerializer.serializeForAudit("MANUAL_TAP", type, decisionMock, comparisonMock);

    this.records.push({
      id: `MANAUDIT-${Math.random().toString(36).substring(7)}`,
      action: "SHADOW_TAP_MANUAL_SIMULATED",
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

  public getManualAuditRecords() {
    return this.records;
  }
}
