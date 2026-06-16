import { FiscalShadowMirrorPlanService } from './FiscalShadowMirrorPlanService';
import { FiscalShadowMirrorRegistryService } from './FiscalShadowMirrorRegistryService';
import { FiscalShadowMirrorReport } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorReportService {
  public static getReport(): FiscalShadowMirrorReport {
    return {
      generatedAt: new Date().toISOString(),
      routes: FiscalShadowMirrorRegistryService.listRoutes(),
      risks: FiscalShadowMirrorRegistryService.getRisks(),
      dependencies: FiscalShadowMirrorRegistryService.getDependencies(),
      plan: FiscalShadowMirrorPlanService.getPlan(),
      readOnly: true,
      planningOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
