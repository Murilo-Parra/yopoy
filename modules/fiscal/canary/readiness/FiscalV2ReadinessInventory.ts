import { FiscalV2ReadinessDomain } from "./FiscalV2ReadinessTypes";

export class FiscalV2ReadinessInventory {
  public static getInventory() {
    return [
      {
        domain: FiscalV2ReadinessDomain.CONTRACTS,
        status: "implementado",
        components: ["FiscalDocument", "FiscalDocumentFilter"]
      },
      {
        domain: FiscalV2ReadinessDomain.REPOSITORIES,
        status: "implementado",
        components: ["FiscalRepository"]
      },
      {
        domain: FiscalV2ReadinessDomain.SERVICES,
        status: "implementado",
        components: ["FiscalService", "FiscalSandboxService", "FiscalDryRunService"]
      },
      {
        domain: FiscalV2ReadinessDomain.CONTROLLERS,
        status: "implementado",
        components: ["FiscalController", "FiscalShadowProxyController", "FiscalV2CanaryController"]
      },
      {
        domain: FiscalV2ReadinessDomain.ROUTES,
        status: "implementado",
        components: ["fiscal.routes.ts", "fiscalV2.routes.ts", "fiscalV2Canary.routes.ts"]
      },
      {
        domain: FiscalV2ReadinessDomain.SANDBOX,
        status: "implementado",
        components: ["FiscalSandboxService", "sandbox endpoint"]
      },
      {
        domain: FiscalV2ReadinessDomain.DRY_RUN,
        status: "implementado",
        components: ["FiscalDryRunService", "dry-run endpoint"]
      },
      {
        domain: FiscalV2ReadinessDomain.SHADOW_PROXY,
        status: "inerte",
        components: ["FiscalShadowProxyController", "ShadowProxyHarness", "ShadowProxySanitizer"]
      },
      {
        domain: FiscalV2ReadinessDomain.SAFE_SHAPE,
        status: "implementado",
        components: ["FiscalSafeShapeValidator", "FiscalSafeShapeSanitizer", "FiscalSafeShapeAllowlist"]
      },
      {
        domain: FiscalV2ReadinessDomain.CANARY_CONTROL,
        status: "bloqueado",
        components: ["CanaryControlPlane", "PreActivationGate", "RuntimeGuard"]
      },
      {
        domain: FiscalV2ReadinessDomain.LEGACY_COMPATIBILITY,
        status: "implementado",
        components: ["Rotas legadas preservadas", "app.use legado preservado"]
      }
    ];
  }
}
