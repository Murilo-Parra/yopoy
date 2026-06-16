import { FiscalShadowMirrorRouteCatalog } from './FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk, FiscalShadowMirrorDependencyType } from './FiscalShadowMirrorTypes';
import { FiscalShadowMirrorSimulationInput } from './FiscalShadowMirrorSimulationTypes';

export class FiscalShadowMirrorSimulationValidator {
  public static validate(input: FiscalShadowMirrorSimulationInput): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!input.companyId) {
      blockers.push('companyId is required');
    }

    if (!input.routeId) {
      blockers.push('routeId is required');
    }

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(input.routeId);
    if (!route) {
      blockers.push(`Route ${input.routeId} not found in catalog`);
      return { valid: false, blockers };
    }

    if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL) {
      blockers.push('Route is CRITICAL and cannot be simulated');
    }

    if (
      route.requiresSefaz ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.SEFAZ)
    ) {
      blockers.push('Route depends on SEFAZ and cannot be simulated');
    }

    if (
      route.requiresXmlSigning ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.XML_SIGNING)
    ) {
      blockers.push('Route depends on XML_SIGNING and cannot be simulated');
    }

    if (
      route.requiresPdfGeneration ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.PDF_GENERATION)
    ) {
      blockers.push('Route depends on PDF_GENERATION and cannot be simulated');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
      blockers.push('Route performs DATABASE_WRITE and cannot be simulated');
    }

    if (route.requiresCertificate || route.dependencies?.includes(FiscalShadowMirrorDependencyType.CERTIFICATE_ACCESS)) {
       blockers.push('Route requires CERTIFICATE_ACCESS and cannot be simulated');
    }

    const checkSensitive = (shape: any) => {
      const str = JSON.stringify(shape || {});
      if (str.includes('token') || str.includes('password') || str.includes('privateKey') || str.includes('certificate') || str.includes('<?xml')) {
        return true;
      }
      return false;
    };

    if (checkSensitive(input.syntheticLegacyShape) || checkSensitive(input.syntheticV2Shape)) {
        blockers.push('Sensitive data or XML detected in synthetic shapes');
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}
