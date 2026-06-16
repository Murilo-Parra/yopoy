import { FiscalSafeShapeMiddlewareDecision } from './FiscalSafeShapeMiddlewareTypes';
import { FiscalSafeShapeMiddlewarePolicy } from './FiscalSafeShapeMiddlewarePolicy';
import { FiscalSafeShapeMiddlewareGuardrails } from './FiscalSafeShapeMiddlewareGuardrails';

export class FiscalSafeShapeMiddlewareDecisionService {
  public static simulateDecision(routeId: string): FiscalSafeShapeMiddlewareDecision {
    const decision = FiscalSafeShapeMiddlewarePolicy.evaluate(routeId);
    
    const guardrails = FiscalSafeShapeMiddlewareGuardrails.getChecklist();
    if (guardrails.length === 0) decision.blockers.push('Missing guardrails');

    decision.installableNow = false;
    decision.allowed = false;
    decision.middlewareInstalled = false;

    return decision;
  }
}
