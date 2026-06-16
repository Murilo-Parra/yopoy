import {
  FiscalShadowMirrorDependencyType,
  FiscalShadowMirrorEligibility,
  FiscalShadowMirrorRouteDescriptor,
  FiscalShadowMirrorRouteRisk
} from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorRiskClassifier {
  public static classify(route: Partial<FiscalShadowMirrorRouteDescriptor>): { risk: FiscalShadowMirrorRouteRisk; eligibility: FiscalShadowMirrorEligibility; sideEffects: string[] } {
    let risk = FiscalShadowMirrorRouteRisk.LOW;
    let eligibility = FiscalShadowMirrorEligibility.ELIGIBLE_FOR_FUTURE_PASSIVE_SIMULATION;
    const sideEffects: string[] = [];

    if (route.requiresSefaz || route.dependencies?.includes(FiscalShadowMirrorDependencyType.SEFAZ)) {
      risk = FiscalShadowMirrorRouteRisk.CRITICAL;
      eligibility = FiscalShadowMirrorEligibility.BLOCKED_BY_CRITICAL_DEPENDENCY;
      sideEffects.push('External side-effect: SEFAZ transmission');
    }

    if (route.requiresXmlSigning || route.dependencies?.includes(FiscalShadowMirrorDependencyType.XML_SIGNING)) {
      risk = FiscalShadowMirrorRouteRisk.CRITICAL;
      eligibility = FiscalShadowMirrorEligibility.BLOCKED_BY_CRITICAL_DEPENDENCY;
      sideEffects.push('Compute/Crypto side-effect: XML Signing');
    }

    if (route.requiresPdfGeneration || route.dependencies?.includes(FiscalShadowMirrorDependencyType.PDF_GENERATION)) {
      if (risk !== FiscalShadowMirrorRouteRisk.CRITICAL) {
        risk = FiscalShadowMirrorRouteRisk.HIGH;
        eligibility = FiscalShadowMirrorEligibility.BLOCKED_BY_SIDE_EFFECT;
      }
      sideEffects.push('Compute side-effect: PDF Generation');
    }

    if (route.dependencies?.includes(FiscalShadowMirrorDependencyType.DATABASE_WRITE)) {
      risk = FiscalShadowMirrorRouteRisk.CRITICAL;
      eligibility = FiscalShadowMirrorEligibility.BLOCKED_BY_CRITICAL_DEPENDENCY;
      sideEffects.push('State side-effect: Database Write');
    }

    if (route.operation?.toLowerCase().includes('sandbox')) {
      if (risk === FiscalShadowMirrorRouteRisk.LOW) {
        risk = FiscalShadowMirrorRouteRisk.LOW;
        eligibility = FiscalShadowMirrorEligibility.ELIGIBLE_FOR_FUTURE_PASSIVE_SIMULATION;
      }
    }

    // High risk overrides default
    if (risk === FiscalShadowMirrorRouteRisk.LOW && (route.operation?.includes('inutilizar') || route.operation?.includes('cancelar') || route.operation?.includes('emitir'))) {
       risk = FiscalShadowMirrorRouteRisk.CRITICAL;
       eligibility = FiscalShadowMirrorEligibility.BLOCKED_BY_SIDE_EFFECT;
       sideEffects.push('Lifecycle mutation');
    }

    return { risk, eligibility, sideEffects };
  }
}
