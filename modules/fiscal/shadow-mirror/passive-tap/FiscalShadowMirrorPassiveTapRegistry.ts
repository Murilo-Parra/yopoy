import { FiscalShadowMirrorRouteCatalog } from '../FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorPassiveTapPoint } from './FiscalShadowMirrorPassiveTapTypes';
import { FiscalShadowMirrorRouteRisk } from '../FiscalShadowMirrorTypes';

export class FiscalShadowMirrorPassiveTapRegistry {
  public static getTapPoints(): FiscalShadowMirrorPassiveTapPoint[] {
    const routes = FiscalShadowMirrorRouteCatalog.getRoutes();
    
    return routes.map(route => ({
      id: `TAP_${route.id}`,
      routeId: route.id,
      legacyMethod: route.legacyMethod,
      legacyPath: route.legacyPath,
      tapCandidate: route.v2CandidatePath || 'UNMAPPED',
      risk: route.risk,
      dependencies: route.dependencies as string[],
      installableNow: false,
      installed: false,
      active: false,
      capturesRequest: false,
      capturesResponse: false,
      callsLegacyHandler: false,
      callsV2Handler: false,
      routeToV2: false,
      routeToLegacy: true,
      designOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    }));
  }

  public static getTapPointByRouteId(routeId: string): FiscalShadowMirrorPassiveTapPoint | undefined {
    return this.getTapPoints().find(t => t.routeId === routeId);
  }
}
