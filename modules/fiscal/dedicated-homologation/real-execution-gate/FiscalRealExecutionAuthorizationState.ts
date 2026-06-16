export class FiscalRealExecutionAuthorizationState {
  public static getState() {
    return {
      module12Authorized: false,
      module13GateUnlocked: false,
      authorizationTokensIssued: 0,
      authorizationLocksActive: true,
      realExecutionBlockedByGate: true,
      requiresNewExplicitModuleForUnlock: true
    };
  }
}
