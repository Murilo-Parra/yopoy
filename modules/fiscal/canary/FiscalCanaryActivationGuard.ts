export class FiscalCanaryActivationGuard {
  public static assertNoRealActivation(input: { requestedMode?: string, activation?: boolean }): void {
    if (input.requestedMode === "ACTIVE" || input.activation === true) {
      throw new Error("Ativação real de Canary proibida na Sprint 4.18. Somente control plane inerte e simulação.");
    }
  }

  public static assertSimulationOnly(): boolean {
    return true; 
  }

  public static blockIfCriticalRoute(route: string, operation: string): boolean {
    if (!route) return false;
    if (route.includes("/transmit") || route.includes("/cancel") || route.includes("/inutilize") || route.includes("/cce")) {
      return true;
    }
    return false;
  }

  public static blockIfExternalSideEffect(operation: string): boolean {
    if (!operation) return false;
    if (operation.includes("TRANSMIT") || operation.includes("SIGN") || operation.includes("SEFAZ")) {
      return true;
    }
    return false;
  }
}
