import { FiscalShadowMirrorCaptureEnvelope, FiscalShadowMirrorCaptureResult, FiscalShadowMirrorCaptureStatus } from './FiscalShadowMirrorCaptureTypes';
import { FiscalShadowMirrorCaptureValidator } from './FiscalShadowMirrorCaptureValidator';
import { FiscalShadowMirrorCapturePolicy } from './FiscalShadowMirrorCapturePolicy';
import { FiscalShadowMirrorCaptureSanitizer } from './FiscalShadowMirrorCaptureSanitizer';
import { FiscalShadowMirrorSimulationService } from './FiscalShadowMirrorSimulationService';
import { FiscalShadowMirrorCaptureAuditService } from './FiscalShadowMirrorCaptureAuditService';
import { FiscalShadowMirrorCaptureReportService } from './FiscalShadowMirrorCaptureReportService';

export class FiscalShadowMirrorCaptureDryRunService {
  public static async simulateCapture(envelope: FiscalShadowMirrorCaptureEnvelope): Promise<FiscalShadowMirrorCaptureResult> {
    const { valid, blockers: validationBlockers } = FiscalShadowMirrorCaptureValidator.validate(envelope);

    if (!valid) {
      let status = FiscalShadowMirrorCaptureStatus.FAILED_SAFE;
      if (validationBlockers.some(b => b.includes('CRITICAL'))) status = FiscalShadowMirrorCaptureStatus.BLOCKED_BY_ROUTE_RISK;
      else if (validationBlockers.some(b => b.includes('depends'))) status = FiscalShadowMirrorCaptureStatus.BLOCKED_BY_CRITICAL_DEPENDENCY;
      else if (validationBlockers.some(b => b.includes('Sensitive'))) status = FiscalShadowMirrorCaptureStatus.BLOCKED_BY_SENSITIVE_INPUT;
      else if (validationBlockers.some(b => b.includes('traffic'))) status = FiscalShadowMirrorCaptureStatus.BLOCKED_BY_REAL_TRAFFIC_ATTEMPT;

      FiscalShadowMirrorCaptureReportService.recordDryRun(envelope.routeId, status);
      await FiscalShadowMirrorCaptureAuditService.logDryRun(envelope.companyId, envelope.routeId, status, validationBlockers);

      return this.buildResult(false, status, envelope.routeId, [], validationBlockers, null, null);
    }

    const decision = FiscalShadowMirrorCapturePolicy.decide(envelope.routeId);
    if (!decision.shouldCapture && decision.blockers.length > 0) {
        const policyStatus = FiscalShadowMirrorCaptureStatus.BLOCKED_BY_ROUTE_RISK;
        FiscalShadowMirrorCaptureReportService.recordDryRun(envelope.routeId, policyStatus);
        await FiscalShadowMirrorCaptureAuditService.logDryRun(envelope.companyId, envelope.routeId, policyStatus, decision.blockers);
        
        return this.buildResult(false, policyStatus, envelope.routeId, decision.warnings, decision.blockers, decision, null);
    }

    const safeEnvelope = FiscalShadowMirrorCaptureSanitizer.sanitize(envelope);

    let simulationResult: any = null;
    if (safeEnvelope.syntheticRequestShape && safeEnvelope.syntheticResponseShape) {
        // Use simulation service passing synthetic shapes to compare them structurally if they represent legacy vs v2
        simulationResult = await FiscalShadowMirrorSimulationService.simulate({
             routeId: safeEnvelope.routeId,
             companyId: safeEnvelope.companyId,
             syntheticLegacyShape: safeEnvelope.syntheticRequestShape,
             syntheticV2Shape: safeEnvelope.syntheticResponseShape 
        });
    }

    const status = FiscalShadowMirrorCaptureStatus.DRY_RUN_SIMULATED;
    FiscalShadowMirrorCaptureReportService.recordDryRun(envelope.routeId, status);
    await FiscalShadowMirrorCaptureAuditService.logDryRun(envelope.companyId, envelope.routeId, status, []);

    return this.buildResult(true, status, envelope.routeId, [], [], decision, safeEnvelope, simulationResult);
  }

  private static buildResult(
    success: boolean, 
    status: string, 
    routeId: string, 
    warnings: string[], 
    blockers: string[],
    decision: any,
    safeEnvelope: any,
    simulationResult: any = null
  ): FiscalShadowMirrorCaptureResult {
    return {
      success, status, routeId, warnings, blockers,
      decision: decision || FiscalShadowMirrorCapturePolicy.decide(routeId),
      safeEnvelope,
      simulationResult,
      dryRunOnly: true, adminEnvelopeOnly: true, captured: false,
      requestCaptured: false, responseCaptured: false, dispatched: false,
      routeToV2: false, routeToLegacy: true, planningOnly: true, simulationOnly: true,
      activationBlocked: true, approvedForRealCanary: false, approvedForProductionV2: false,
      payloadIncluded: false, sensitiveDataIncluded: false
    };
  }
}
