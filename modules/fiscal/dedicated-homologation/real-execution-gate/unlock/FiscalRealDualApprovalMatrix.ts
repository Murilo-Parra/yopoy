import { FiscalRealUnlockDomain } from './FiscalRealUnlockSimulationTypes';

export class FiscalRealDualApprovalMatrix {
  public static getMatrix() {
    return Object.values(FiscalRealUnlockDomain).map(domain => ({
      domain,
      primaryApproverRequired: true,
      secondaryApproverRequired: true,
      samePersonAllowed: false,
      primaryApprovalPresentForSimulation: true,
      secondaryApprovalPresentForSimulation: true,
      dualApprovalSatisfiedForSimulation: true,
      dualApprovalSatisfiedForRealUnlock: false,
      realUnlockAllowed: false,
      activationBlocked: true
    }));
  }
}
