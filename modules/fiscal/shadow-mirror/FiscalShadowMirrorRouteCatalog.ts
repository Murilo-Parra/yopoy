import { FiscalShadowMirrorDependencyMap } from './FiscalShadowMirrorDependencyMap';
import { FiscalShadowMirrorRiskClassifier } from './FiscalShadowMirrorRiskClassifier';
import { FiscalShadowMirrorRouteDescriptor } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorRouteCatalog {
  public static getRoutes(): FiscalShadowMirrorRouteDescriptor[] {
    const rawRoutes = [
      { id: 'GET_NFE_LIST', legacyMethod: 'GET', legacyPath: '/api/fiscal/nfe', v2CandidatePath: '/api/fiscal-v2/shadow-mirror/nfe', operation: 'List NFe metadata' },
      { id: 'GET_NFCE_LIST', legacyMethod: 'GET', legacyPath: '/api/fiscal/nfce', v2CandidatePath: '/api/fiscal-v2/shadow-mirror/nfce', operation: 'List NFCe metadata' },
      { id: 'GET_NFE_ID', legacyMethod: 'GET', legacyPath: '/api/fiscal/nfe/:id', v2CandidatePath: '/api/fiscal-v2/shadow-mirror/nfe/:id', operation: 'Get NFe details' },
      { id: 'GET_DANFE_PDF', legacyMethod: 'GET', legacyPath: '/api/fiscal/nfe/:id/danfe', v2CandidatePath: undefined, operation: 'Generate DANFE PDF' },
      { id: 'EMIT_NFE', legacyMethod: 'POST', legacyPath: '/api/fiscal/nfe', v2CandidatePath: undefined, operation: 'Emitir NFe' },
      { id: 'CANCEL_NFE', legacyMethod: 'POST', legacyPath: '/api/fiscal/nfe/:id/cancel', v2CandidatePath: undefined, operation: 'Cancelar NFe' },
      { id: 'GET_SANDBOX_EVIDENCE', legacyMethod: 'GET', legacyPath: '/api/fiscal-v2/sandbox-evidence/summary', v2CandidatePath: '/api/fiscal-v2/sandbox-evidence/summary', operation: 'Sandbox read-only' }
    ];

    const mappedRoutes: FiscalShadowMirrorRouteDescriptor[] = rawRoutes.map(r => {
      const deps = FiscalShadowMirrorDependencyMap.getDependenciesForRoute(r.id);
      
      const requiresSefaz = Object.values(deps).includes('SEFAZ' as any);
      const requiresXmlSigning = Object.values(deps).includes('XML_SIGNING' as any);
      const requiresPdfGeneration = Object.values(deps).includes('PDF_GENERATION' as any);
      const requiresCertificate = Object.values(deps).includes('CERTIFICATE_ACCESS' as any);

      const classification = FiscalShadowMirrorRiskClassifier.classify({
        operation: r.operation,
        dependencies: deps,
        requiresSefaz,
        requiresXmlSigning,
        requiresPdfGeneration,
        requiresCertificate
      });

      return {
        id: r.id,
        legacyMethod: r.legacyMethod,
        legacyPath: r.legacyPath,
        v2CandidatePath: r.v2CandidatePath,
        operation: r.operation,
        risk: classification.risk,
        eligibility: classification.eligibility,
        dependencies: deps,
        sideEffects: classification.sideEffects,
        requiresSefaz,
        requiresXmlSigning,
        requiresPdfGeneration,
        requiresCertificate,
        canMirrorFuture: false, // Force false for planning
        routeToV2: false,
        routeToLegacy: true,
        planningOnly: true,
        activationBlocked: true,
        approvedForRealCanary: false,
        approvedForProductionV2: false
      };
    });

    return mappedRoutes;
  }

  public static getRouteById(id: string): FiscalShadowMirrorRouteDescriptor | undefined {
    return this.getRoutes().find(r => r.id === id);
  }
}
