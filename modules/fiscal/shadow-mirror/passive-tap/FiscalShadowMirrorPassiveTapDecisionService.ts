import { FiscalShadowMirrorPassiveTapDecision } from './FiscalShadowMirrorPassiveTapTypes';
import { FiscalShadowMirrorPassiveTapRegistry } from './FiscalShadowMirrorPassiveTapRegistry';
import { FiscalShadowMirrorPassiveTapPolicy } from './FiscalShadowMirrorPassiveTapPolicy';
import { FiscalShadowMirrorPassiveTapGuardrails } from './FiscalShadowMirrorPassiveTapGuardrails';

export class FiscalShadowMirrorPassiveTapDecisionService {
  public static simulateDecision(routeId: string): FiscalShadowMirrorPassiveTapDecision {
    const tapPoint = FiscalShadowMirrorPassiveTapRegistry.getTapPointByRouteId(routeId);
    
    if (!tapPoint) {
      return {
        allowed: false,
        installableNow: false,
        reason: 'Tap point not found in registry',
        blockers: ['UNMAPPED_ROUTE'],
        warnings: [],
        designOnly: true,
        planningOnly: true,
        activationBlocked: true
      };
    }

    const decision = FiscalShadowMirrorPassiveTapPolicy.evaluate(routeId);
    
    // Applying guardrails forcefully (redundant safety)
    const guardrails = FiscalShadowMirrorPassiveTapGuardrails.getChecklist();
    if (guardrails.length === 0) decision.blockers.push('Missing guardrails');

    decision.installableNow = false;
    decision.allowed = false;

    return decision;
  }
}
