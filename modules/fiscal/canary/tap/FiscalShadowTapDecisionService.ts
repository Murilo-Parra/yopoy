import { FiscalShadowTapConfig } from "./FiscalShadowTapConfig";
import { FiscalShadowTapPolicy } from "./FiscalShadowTapPolicy";
import { FiscalShadowTapDecision, FiscalShadowTapMode } from "./FiscalShadowTapTypes";

export class FiscalShadowTapDecisionService {
  private policy: FiscalShadowTapPolicy;

  constructor() {
    this.policy = new FiscalShadowTapPolicy();
  }

  public getStatus() {
    return {
      mode: FiscalShadowTapConfig.getMode(),
      captureRequestEnabled: FiscalShadowTapConfig.isCaptureRequestEnabled(),
      captureResponseEnabled: FiscalShadowTapConfig.isCaptureResponseEnabled(),
      capturePercentage: FiscalShadowTapConfig.getCapturePercentage(),
      hardOffEnforced: true
    };
  }

  public getConfigSnapshot() {
    return {
      mode: FiscalShadowTapConfig.getMode(),
      blockedRoutes: FiscalShadowTapConfig.getBlockedRoutes(),
      blockedOperations: FiscalShadowTapConfig.getBlockedOperations(),
      hardOffEnforced: true
    };
  }

  public evaluateCapture(route: string, operation: string): FiscalShadowTapDecision {
    return this.policy.evaluate(route, operation);
  }

  public validateHardOff(): boolean {
    const status = this.getStatus();
    return status.mode === FiscalShadowTapMode.HARD_OFF 
        && status.captureRequestEnabled === false 
        && status.captureResponseEnabled === false
        && status.capturePercentage === 0;
  }
}
