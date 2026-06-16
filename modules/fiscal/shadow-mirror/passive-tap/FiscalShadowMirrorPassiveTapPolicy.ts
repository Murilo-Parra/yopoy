import { FiscalShadowMirrorPassiveTapDecision } from './FiscalShadowMirrorPassiveTapTypes';
import { FiscalShadowMirrorRouteCatalog } from '../FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk, FiscalShadowMirrorDependencyType } from '../FiscalShadowMirrorTypes';

export class FiscalShadowMirrorPassiveTapPolicy {
  public static evaluate(routeId: string): FiscalShadowMirrorPassiveTapDecision {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const decision: FiscalShadowMirrorPassiveTapDecision = {
      allowed: false,
      installableNow: false,
      reason: 'Passive Tap Design não instala middleware, não captura tráfego real e não autoriza Shadow Mirror ativo.',
      blockers,
      warnings,
      designOnly: true,
      planningOnly: true,
      activationBlocked: true
    };

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(routeId);
    if (!route) {
      blockers.push('Route not found in catalog');
      return decision;
    }

    if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL) {
      blockers.push('Route is CRITICAL and cannot have a Passive Tap installed');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
      blockers.push('Route performs DATABASE_WRITE (Not safe for passive tap replication)');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.SEFAZ)) {
      blockers.push('Route calls SEFAZ (Critical Side Effect)');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.XML_SIGNING)) {
      blockers.push('Route signs XML (Compute Side Effect)');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.PDF_GENERATION)) {
      blockers.push('Route generates PDF (Compute Side Effect)');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.CERTIFICATE_ACCESS)) {
      blockers.push('Route requires Certificates');
    }

    return decision;
  }
}
