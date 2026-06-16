import { FiscalShadowMode } from "./fiscalShadow.types";

export class FiscalShadowConfig {
  public static isEnabled(): boolean {
    const env = process.env.NODE_ENV || "development";
    if (env === "production") {
      // In production, MUST explicitly enable shadow feature flag
      return process.env.FISCAL_SHADOW_ENABLED === "true";
    }
    // In dev/test, can be enabled or default to what flag says, or just false default
    return process.env.FISCAL_SHADOW_ENABLED === "true";
  }

  public static getMode(): FiscalShadowMode {
    const mode = process.env.FISCAL_SHADOW_MODE;
    if (mode === "SANDBOX_COMPARE") return FiscalShadowMode.SANDBOX_COMPARE;
    return FiscalShadowMode.DRY_RUN_COMPARE;
  }

  public static isRouteAllowed(route: string): boolean {
    const allowed = process.env.FISCAL_SHADOW_ALLOWED_ROUTES;
    if (!allowed) return false;
    
    // allow all trick for dev if needed, or parse comma-separated
    if (allowed === "*") return true;

    const routes = allowed.split(",").map(r => r.trim());
    return routes.includes(route);
  }
}
