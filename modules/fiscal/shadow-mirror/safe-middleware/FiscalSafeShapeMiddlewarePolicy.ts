import { FiscalSafeShapeMiddlewareDecision } from './FiscalSafeShapeMiddlewareTypes';
import { FiscalShadowMirrorRouteCatalog } from '../FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk, FiscalShadowMirrorDependencyType } from '../FiscalShadowMirrorTypes';

export class FiscalSafeShapeMiddlewarePolicy {
  public static evaluate(routeId: string): FiscalSafeShapeMiddlewareDecision {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const decision: FiscalSafeShapeMiddlewareDecision = {
      allowed: false,
      installableNow: false,
      middlewareInstalled: false,
      reason: 'Safe-Shape Middleware Design não instala middleware, não captura tráfego real e não autoriza Shadow Mirror ativo.',
      blockers,
      warnings,
      designOnly: true,
      validationOnly: true,
      activationBlocked: true
    };

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(routeId);
    if (!route) {
      blockers.push('Route not found in catalog');
      return decision;
    }

    if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL) {
      blockers.push('Route is CRITICAL and cannot have Middleware');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
      blockers.push('Route performs DATABASE_WRITE (Not safe)');
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
