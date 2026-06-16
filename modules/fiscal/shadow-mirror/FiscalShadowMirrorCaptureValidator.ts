import { FiscalShadowMirrorRouteCatalog } from './FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteRisk, FiscalShadowMirrorDependencyType } from './FiscalShadowMirrorTypes';
import { FiscalShadowMirrorCaptureEnvelope } from './FiscalShadowMirrorCaptureTypes';

export class FiscalShadowMirrorCaptureValidator {
  public static validate(envelope: FiscalShadowMirrorCaptureEnvelope): { valid: boolean; blockers: string[] } {
    const blockers: string[] = [];

    if (!envelope.companyId) {
      blockers.push('companyId is required');
    }

    if (!envelope.routeId) {
      blockers.push('routeId is required');
    }

    const route = FiscalShadowMirrorRouteCatalog.getRouteById(envelope.routeId);
    if (!route) {
      blockers.push(`Route ${envelope.routeId} not found in catalog`);
      return { valid: false, blockers };
    }

    if (route.risk === FiscalShadowMirrorRouteRisk.CRITICAL) {
      blockers.push('Route is CRITICAL and cannot be captured');
    }

    if (
      route.requiresSefaz ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.SEFAZ)
    ) {
      blockers.push('Route depends on SEFAZ and cannot be captured');
    }

    if (
      route.requiresXmlSigning ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.XML_SIGNING)
    ) {
      blockers.push('Route depends on XML_SIGNING and cannot be captured');
    }

    if (
      route.requiresPdfGeneration ||
      route.dependencies?.includes(FiscalShadowMirrorDependencyType.PDF_GENERATION)
    ) {
      blockers.push('Route depends on PDF_GENERATION and cannot be captured');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
      blockers.push('Route performs DATABASE_WRITE and cannot be captured');
    }

    if (route.requiresCertificate || route.dependencies?.includes(FiscalShadowMirrorDependencyType.CERTIFICATE_ACCESS)) {
       blockers.push('Route requires CERTIFICATE_ACCESS and cannot be captured');
    }

    // Detect attempts to send real info
    if (envelope.metadata?.isRealRequest || envelope.metadata?.isRealResponse) {
      blockers.push('Attempted to send real traffic. Only synthetic envelopes are allowed.');
    }

    const checkSensitive = (shape: any) => {
      const str = JSON.stringify(shape || {});
      if (str.includes('token') || str.includes('password') || str.includes('privateKey') || str.includes('certificate') || str.includes('<?xml')) {
        return true;
      }
      return false;
    };

    if (checkSensitive(envelope.syntheticRequestShape) || checkSensitive(envelope.syntheticResponseShape) || checkSensitive(envelope.syntheticHeaders)) {
        blockers.push('Sensitive data or XML detected in synthetic envelope');
    }

    return {
      valid: blockers.length === 0,
      blockers
    };
  }
}
