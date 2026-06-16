import { FiscalShadowMirrorPassiveTapRegistry } from './FiscalShadowMirrorPassiveTapRegistry';
import { FiscalShadowMirrorPassiveTapPlan } from './FiscalShadowMirrorPassiveTapTypes';

export class FiscalShadowMirrorPassiveTapPlanService {
  public static getPlan(): FiscalShadowMirrorPassiveTapPlan {
    const tapPoints = FiscalShadowMirrorPassiveTapRegistry.getTapPoints();
    let blocked = 0;
    let eligible = 0;

    for (const tap of tapPoints) {
      if (tap.risk === 'CRITICAL' || tap.risk === 'HIGH') blocked++;
      else eligible++;
    }

    return {
      generatedAt: new Date().toISOString(),
      totalTapPoints: tapPoints.length,
      blockedTapPoints: blocked,
      futureEligibleTapPoints: eligible,
      requiredBeforeInstall: [
        'testes de carga sintéticos.',
        'validação manual de rotas candidatas.',
        'evolução de safe-shape.',
        'documentação de rollback.',
        'desenho de middleware futuro sem instalação.'
      ],
      forbiddenActions: [
        'instalar middleware.',
        'alterar app.use.',
        'capturar request/response real.',
        'chamar handlers.',
        'rotear para V2.',
        'SEFAZ/XML/PDF.'
      ],
      designOnly: true,
      planningOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}
