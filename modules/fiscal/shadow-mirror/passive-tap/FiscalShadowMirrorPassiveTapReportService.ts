import { FiscalShadowMirrorPassiveTapRegistry } from './FiscalShadowMirrorPassiveTapRegistry';
import { FiscalShadowMirrorPassiveTapGuardrails } from './FiscalShadowMirrorPassiveTapGuardrails';
import { FiscalShadowMirrorPassiveTapPlanService } from './FiscalShadowMirrorPassiveTapPlanService';
import { FiscalShadowMirrorPassiveTapReport } from './FiscalShadowMirrorPassiveTapTypes';

export class FiscalShadowMirrorPassiveTapReportService {
  public static getReport(): FiscalShadowMirrorPassiveTapReport {
    return {
      generatedAt: new Date().toISOString(),
      registry: FiscalShadowMirrorPassiveTapRegistry.getTapPoints(),
      guardrails: FiscalShadowMirrorPassiveTapGuardrails.getChecklist(),
      plan: FiscalShadowMirrorPassiveTapPlanService.getPlan(),
      decisions: [],
      readOnly: true,
      designOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
