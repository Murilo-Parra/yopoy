import { FiscalCanaryControlMode } from "./FiscalCanaryControlTypes";

export class FiscalCanaryControlConfig {
  public static isControlEnabled(): boolean {
    return process.env.FISCAL_CANARY_CONTROL_ENABLED === "true";
  }

  public static getControlMode(): FiscalCanaryControlMode {
    const envMode = process.env.FISCAL_CANARY_CONTROL_MODE;
    if (envMode === "ACTIVE" || envMode === "ENABLED") {
      console.warn("[FISCAL_CANARY_CONTROL] Attempted to enable ACTIVE mode. Blocking and forcing SIMULATION_ONLY.");
      return FiscalCanaryControlMode.BLOCKED;
    }
    if (envMode === "APPROVAL_ONLY") {
      return FiscalCanaryControlMode.APPROVAL_ONLY;
    }
    return FiscalCanaryControlMode.SIMULATION_ONLY;
  }

  public static isAllowlistEnabled(): boolean {
    return process.env.FISCAL_CANARY_ALLOWLIST_ENABLED === "true";
  }

  public static isApprovalRequired(): boolean {
    return process.env.FISCAL_CANARY_APPROVAL_REQUIRED !== "false";
  }
}
