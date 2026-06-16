import { FiscalShadowMirrorCaptureDecision } from './FiscalShadowMirrorCaptureTypes';
import { FiscalShadowMirrorRouteCatalog } from './FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk, FiscalShadowMirrorDependencyType } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorCapturePolicy {
  public static decide(routeId: string): FiscalShadowMirrorCaptureDecision {
    const blockers: string[] = [];
    const warnings: string[] = [];
    
    // Core policy mandate
    const decision: FiscalShadowMirrorCaptureDecision = {
      shouldCapture: false,
      captureAllowed: false,
      dryRunOnly: true,
      reason: 'Capture Dry-Run não captura tráfego real e não autoriza Shadow Mirror ativo.',
      blockers,
      warnings
    };

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(routeId);
    if (!route) {
        blockers.push('Route unmapped');
        return decision;
    }

    if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL) {
      blockers.push('Route Risk is CRITICAL');
    }
    
    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.SEFAZ)) {
        blockers.push('SEFAZ side-effect');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.XML_SIGNING)) {
        blockers.push('XML Signing side-effect');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.PDF_GENERATION)) {
        blockers.push('PDF Generation side-effect');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
        blockers.push('Database Write side-effect');
    }

    return decision;
  }
}
