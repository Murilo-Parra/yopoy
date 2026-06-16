import { FiscalShadowMirrorSimulationInput, FiscalShadowMirrorSimulationResult, FiscalShadowMirrorSimulationStatus } from './FiscalShadowMirrorSimulationTypes';
import { FiscalShadowMirrorSimulationValidator } from './FiscalShadowMirrorSimulationValidator';
import { FiscalShadowMirrorSafeShapeBuilder } from './FiscalShadowMirrorSafeShapeBuilder';
import { FiscalShadowMirrorShapeComparator } from './FiscalShadowMirrorShapeComparator';
import { FiscalShadowMirrorSimulationAuditService } from './FiscalShadowMirrorSimulationAuditService';
import { FiscalShadowMirrorSimulationReportService } from './FiscalShadowMirrorSimulationReportService';

export class FiscalShadowMirrorSimulationService {
  public static async simulate(input: FiscalShadowMirrorSimulationInput): Promise<FiscalShadowMirrorSimulationResult> {
    const { valid, blockers } = FiscalShadowMirrorSimulationValidator.validate(input);

    if (!valid) {
      let status = FiscalShadowMirrorSimulationStatus.FAILED_SAFE;
      if (blockers.some(b => b.includes('CRITICAL'))) status = FiscalShadowMirrorSimulationStatus.BLOCKED_BY_ROUTE_RISK;
      else if (blockers.some(b => b.includes('depends'))) status = FiscalShadowMirrorSimulationStatus.BLOCKED_BY_CRITICAL_DEPENDENCY;
      else if (blockers.some(b => b.includes('Sensitive'))) status = FiscalShadowMirrorSimulationStatus.BLOCKED_BY_SENSITIVE_INPUT;

      FiscalShadowMirrorSimulationReportService.recordSimulation(input.routeId, status);
      await FiscalShadowMirrorSimulationAuditService.logSimulationRun(input.companyId, input.routeId, status, blockers);

      return this.buildResult(false, status, input.routeId, [], blockers);
    }

    const { safeShape: legacyObj } = FiscalShadowMirrorSafeShapeBuilder.buildSafeShape(input.syntheticLegacyShape);
    const { safeShape: v2Obj } = FiscalShadowMirrorSafeShapeBuilder.buildSafeShape(input.syntheticV2Shape);

    const differences = FiscalShadowMirrorShapeComparator.compare(legacyObj, v2Obj);
    const status = FiscalShadowMirrorSimulationStatus.SIMULATED;

    FiscalShadowMirrorSimulationReportService.recordSimulation(input.routeId, status);
    await FiscalShadowMirrorSimulationAuditService.logSimulationRun(input.companyId, input.routeId, status, []);

    return this.buildResult(true, status, input.routeId, differences, []);
  }

  private static buildResult(success: boolean, status: string, routeId: string, differences: any[], blockers: string[]): FiscalShadowMirrorSimulationResult {
    return {
      success, status, routeId, differences, warnings: [], blockers,
      manualOnly: true, syntheticOnly: true, captured: false, dispatched: false,
      routeToV2: false, routeToLegacy: true, planningOnly: true, simulationOnly: true,
      activationBlocked: true, approvedForRealCanary: false, approvedForProductionV2: false,
      payloadIncluded: false, sensitiveDataIncluded: false
    };
  }
}
