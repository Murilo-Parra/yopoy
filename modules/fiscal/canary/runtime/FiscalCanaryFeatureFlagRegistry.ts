import { FiscalCanaryFeatureFlagSnapshot, FiscalCanaryRuntimeMode } from "./FiscalCanaryRuntimeTypes";

export class FiscalCanaryFeatureFlagRegistry {
  public getSnapshot(): FiscalCanaryFeatureFlagSnapshot {
    return {
      globalCanaryEnabled: false,
      routeCanaryEnabled: false,
      tenantCanaryEnabled: false,
      killSwitchActive: true,
      mode: FiscalCanaryRuntimeMode.HARD_OFF,
      source: "STATIC_REGISTRY_SPRINT_4_23"
    };
  }
}
