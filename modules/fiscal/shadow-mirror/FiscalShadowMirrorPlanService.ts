import { FiscalShadowMirrorRouteCatalog } from './FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorPlan, FiscalShadowMirrorEligibility, FiscalShadowMirrorRouteRisk } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorPlanService {
  public static getPlan(): FiscalShadowMirrorPlan {
    const routes = FiscalShadowMirrorRouteCatalog.getRoutes();
    
    let eligible = 0;
    let blocked = 0;
    let critical = 0;

    for (const r of routes) {
      if (r.eligibility === FiscalShadowMirrorEligibility.ELIGIBLE_FOR_FUTURE_PASSIVE_SIMULATION) eligible++;
      if (r.eligibility.includes('BLOCKED')) blocked++;
      if (r.risk === FiscalShadowMirrorRouteRisk.CRITICAL) critical++;
    }

    return {
      generatedAt: new Date().toISOString(),
      totalRoutes: routes.length,
      eligibleFutureCandidates: eligible,
      blockedRoutes: blocked,
      criticalRoutes: critical,
      nextSteps: [
        'Documentar rotas candidatas para testes do Módulo 7.2',
        'Validar inércia de endpoints read-only na próxima fase'
      ],
      forbiddenActions: [
        'Interceptar trafego real',
        'Acionar handlers V2'
      ],
      planningOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}
