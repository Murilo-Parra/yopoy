import { FiscalCanaryStatus } from "./FiscalCanaryTypes";

export class FiscalCanaryConfig {
  public static isPlanningEnabled(): boolean {
    return process.env.FISCAL_CANARY_PLANNING_ENABLED === "true";
  }

  public static getMinimumReadinessScore(): number {
    const defaultScore = 90;
    const envVal = parseInt(process.env.FISCAL_CANARY_MIN_READINESS_SCORE || "");
    return isNaN(envVal) ? defaultScore : envVal;
  }

  public static getRequiredSampleSize(): number {
    const defaultSize = 100;
    const envVal = parseInt(process.env.FISCAL_CANARY_REQUIRED_SAMPLE_SIZE || "");
    return isNaN(envVal) ? defaultSize : envVal;
  }

  public static getAllowedRoutes(): string[] {
    return (process.env.FISCAL_CANARY_ALLOWED_ROUTES || "").split(",").filter(r => r.trim() !== "");
  }

  public static getMode(): string {
    const envMode = process.env.FISCAL_CANARY_MODE;
    if (envMode === "ACTIVE" || envMode === "ENABLED") {
      // Hard block: Force SIMULATION_ONLY in Sprint 4.17
      console.warn("[FISCAL_CANARY_CONFIG] Attempted to enable real canary. Forcing SIMULATION_ONLY.");
      return FiscalCanaryStatus.SIMULATION_ONLY;
    }
    return FiscalCanaryStatus.SIMULATION_ONLY;
  }
}
